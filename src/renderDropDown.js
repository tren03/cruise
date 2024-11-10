import { resultsContainer } from './htmlElements'
import { updateThemeColor } from './colors'
import { currentState } from './currentState'
import { searchValidUrl } from './urlHandlers'

// Rendering main dropdown for 4 different modes
// htmlElements, currentState
export function renderDropDown(filteredTabs) {
    resultsContainer.innerHTML = ''
    currentState.currentIndex = 0

    let limitedResults = filteredTabs.slice(0, 6) // Limit results to 6

    // if no results, give option to search the web
    if (limitedResults.length == 0) {
        const li = document.createElement('li')
        li.innerHTML = `<img src="fav.png" alt="favicon" style="width:20px; height: 20px; margin-right: 8px; padding: 1px ; border-radius: 4px;">
<strong>Search the web for it</strong>`
        li.classList.add('result-item') // Add a class for styling
        li.classList.add('highlight') // You can define this class in CSS to apply styles (like background color)
        li.setAttribute('data-search-element', true) // setting metadata for tab to search web
        resultsContainer.appendChild(li) // Append the list item to the unordered list
        return
    }

    limitedResults.forEach((tab, index) => {
        const li = document.createElement('li')
        //        console.log("my current mode here " + currentMode);

        let urlObj = new URL(tab.url)
        let mainDomain = urlObj.hostname.replace('www.', '')

        // Set the text to include both title and URL
        let inWindow = ''
        if (currentState.currentMode === 'T') {
            if (tab.windowId != currentState.currentWindowId) {
                inWindow = ' (other tab)'
            }
        }

        // since bookmarks need to include category
        if (currentState.currentMode === 'B') {
            li.innerHTML = `<img src="fav.png" alt="favicon" style="width:20px; height: 20px; margin-right: 8px; padding: 1px ; border-radius: 4px;">

    <div class="result-item-text">
    <strong style="display: block;">${tab.title}</strong>
    <small style="display: block;">${tab.url} Category = ${tab.parent}</small>
    </div>`

            li.classList.add('result-item') // Add a class for styling
            li.setAttribute('data-tab-id', tab.id) // Store tab ID
            li.setAttribute('data-search-element', false) // Store tab ID
        } else {
            if (tab.favIconUrl) {
                li.innerHTML = `
    <img src="${tab.favIconUrl}" alt="favicon" style="width: 20px; height: 20px; margin-right: 8px; padding: 1px;  border-radius: 4px;">
    <div class="result-item-text">
         <strong style="display: block;">${tab.title}</strong>
    <small style="display: block;">${mainDomain} ${inWindow}</small>
    </div>`
            } else {
                li.innerHTML = `
    <img src="fav.png" alt="favicon" style="width:20px; height: 20px; margin-right: 8px; padding: 1px ; border-radius: 4px;">
    <div class="result-item-text">
    <strong style="display: block;">${tab.title}</strong>
    <small style="display: block;">${mainDomain} ${inWindow}</small>
    </div>`
            }

            li.classList.add('result-item') // Add a class for styling
            li.setAttribute('data-tab-id', tab.id) // Store tab ID
            li.setAttribute('data-search-element', false) // Store tab ID
        }

        if (currentState.currentMode === 'T') {
            li.setAttribute('data-window-id', tab.windowId)
        }

        // Highlight the first result (highest score)
        if (index === 0) {
            li.classList.add('highlight') // You can define this class in CSS to apply styles (like background color)
        }

        if (currentState.currentMode === 'T') {
            // On click, switch to the clicked tab
            //           console.log("we are adding Tab event list");
            li.addEventListener('click', () => {
                chrome.tabs.update(tab.id, { active: true }) // Switch to the clicked tab
            })
        }

        if (
            currentState.currentMode === 'H' ||
            currentState.currentMode === 'F' ||
            currentState.currentMode === 'B'
        ) {
            //          console.log(
            //             "we are adding Hist and topsites and bookmark event list",
            //         );
            li.addEventListener('click', () => {
                console.log('hist url : ' + tab.url)
                searchValidUrl(tab.url)
            })
        }

        resultsContainer.appendChild(li) // Append the list item to the unordered list
    })
}
// render dropdown for help
export function renderHelpDropDown() {
    resultsContainer.innerHTML = ''
    const li = document.createElement('li')
    li.innerHTML = `<strong>Go to the Cruise help page</strong><br>`
    li.classList.add('result-item') // Add a class for styling
    li.classList.add('highlight')
    li.addEventListener('click', function () {
        chrome.tabs.create({ url: chrome.runtime.getURL('help.html') })
    })

    li.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            chrome.tabs.create({ url: chrome.runtime.getURL('help.html') })
        }
    })
    resultsContainer.appendChild(li)
}

// render dropdown for colors
export function renderCommandDropDown(colorArray) {
    console.log('enter command dropdown')
    resultsContainer.innerHTML = ''
    currentState.currentIndex = 0
    console.log('color array recieved ', colorArray)
    colorArray.forEach((obj, index) => {
        const li = document.createElement('li')
        if (index == 0) {
            li.classList.add('highlight') // You can define this class in CSS to apply styles (like background color)
        }
        li.innerHTML = `<strong>${obj.color}</strong>`
        li.classList.add('result-item') // Add a class for styling
        li.addEventListener('click', () => {
            updateThemeColor(obj.code)
            console.log('you clicked ', obj.color, obj.code)
        })
        resultsContainer.appendChild(li)
    })
}
