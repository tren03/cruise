import { availableColors  } from './colors'
import { searchInput, resultsContainer, currentModeNode } from './htmlElements'
import { data } from './data'
import { fuseVariables } from './fuseVariables'
import {
    renderHelpDropDown,
    renderCommandDropDown,
    renderDropDown,
} from './renderDropDown'
import { currentState } from './currentState'


// Event listener for search input
export function searchInputEventListener() {
    searchInput.addEventListener('input', (e) => {
        let query = e.target.value.trim()

        if (currentState.currentMode === 'COL' && !query.startsWith('/')) {
            currentState.currentMode = 'T'
            currentModeNode.textContent = 'T'
            renderDropDown(data.tabs)
            return
        }

        if (query.startsWith('/')) {
            console.log('in command')
            resultsContainer.innerHTML = ''
            currentState.currentMode = 'COL'
            currentModeNode.textContent = 'COL'
            if (query.startsWith('/h')) {
                renderHelpDropDown()

                return
            }
            if (query.startsWith('/c')) {
                console.log('we are in color mode')
                if (query == '/c') {
                    renderCommandDropDown(availableColors)
                } else {
                    let colorquery = query.slice(2)
                    let trimmedColorQuery = colorquery.trim()
                    console.log('trimmed query ', trimmedColorQuery)
                    let fuzcol = fuseVariables.fuseColors.search(trimmedColorQuery)
                    // since fuse.js returns array of obj in type {item :{obj}}
                    let filteredColors = fuzcol.map((result) => result.item)
                    renderCommandDropDown(filteredColors)
                }
                return
            }
            return
        }
        if (query === '') {
            if (currentState.currentMode === 'T') {
                renderDropDown(data.tabs)
            }

            if (currentState.currentMode === 'H') {
                renderDropDown(data.history)
            }

            if (currentState.currentMode === 'F') {
                renderDropDown(data.topsites)
            }

            if (currentState.currentMode === 'B') {
                renderDropDown(data.bookmarks)
            }
        } else {
            let fuzzres
            if (currentState.currentMode === 'T') {
                console.log('search tab data')
                fuzzres = fuseVariables.fuseTab.search(query)
            }

            if (currentState.currentMode === 'H') {
                console.log('search history data')
                fuzzres = fuseVariables.fuseHistory.search(query)
            }

            if (currentState.currentMode === 'F') {
                console.log('search tab topsite data')
                fuzzres = fuseVariables.fuseTopSites.search(query)
            }
            if (currentState.currentMode === 'B') {
                console.log('search tab bookmark data')
                fuzzres = fuseVariables.fuseBookmark.search(query)
            }
            let filteredTabs = fuzzres.map((result) => result.item)
            renderDropDown(filteredTabs) // Pass true to highlight the max score
        }
    })
}
