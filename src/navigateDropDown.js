import { resultsContainer } from './htmlElements'
import { searchUrl } from './urlHandlers'
import { currentState } from './currentState'

// To handle the highlighting of list values
function highlightItem(index) {
    const items = resultsContainer.querySelectorAll('li')
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('highlight') // Add the highlight class to the selected item
            item.scrollIntoView({ block: 'nearest' }) // Scroll to the item if necessary
        } else {
            item.classList.remove('highlight') // Remove the highlight class from other items
        }
    })
}

// To handle the navigation between list elements and click/enter function
export function handleNavigation(e) {
    const items = resultsContainer.querySelectorAll('li')

    if (
        currentState.currentMode === 'T' ||
        currentState.currentMode === 'B' ||
        currentState.currentMode === 'F' ||
        currentState.currentMode === 'H'
    ) {
        if (
            items.length === 1 &&
            // html stores meta values as strings it seems, so i need to check for string when i search the data-search-element attribute
            items[0].getAttribute('data-search-element') === 'true' &&
            e.key === 'Enter'
        ) {
            console.log('you want to search the web')

            searchUrl(searchInput.value)
                .then(() => console.log('success in creating new tab'))
                .catch((err) => console.log('fail in creating new tab: ' + err))

            return
        }
    }

    if (e.key === 'ArrowDown') {
        currentState.currentIndex =
            (currentState.currentIndex + 1) % items.length // Move down the list
        highlightItem(currentState.currentIndex)
    } else if (e.key === 'ArrowUp') {
        currentState.currentIndex =
            (currentState.currentIndex - 1 + items.length) % items.length // Move up the list
        highlightItem(currentState.currentIndex)
    } else if (
        e.key === 'Enter' &&
        !e.shiftKey &&
        currentState.currentIndex >= 0
    ) {
        items[currentState.currentIndex].click() // Trigger click on the selected item
        if (currentState.currentMode === 'T') {
            let tabWindow =
                items[currentState.currentIndex].getAttribute('data-window-id')
            if (tabWindow != currentState.currentWindowId) {
                focusWindow(tabWindow)
                    .then()(() => console.log('success in focusing window'))
                    .catch((err) =>
                        console.log('err in focusing window : ' + err)
                    )
            }
            console.log('the clicked tab has window id ' + tabWindow)
        }
    }
}

// To change window focus
async function focusWindow(targetWindowId) {
    try {
        // Update the target window to bring it into focus
        console.log('type of target window sent down ' + typeof targetWindowId)
        let numberTarget = Number(targetWindowId)
        await chrome.windows.update(numberTarget, { focused: true })
        console.log(`Switched focus to window with ID: ${numberTarget}`)
    } catch (error) {
        console.log('Error switching focus to window: ', error)
    }
}
