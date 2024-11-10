import { mainContainer,currentModeNode,searchInput} from "./htmlElements"
import { handleNavigation } from "./navigateDropDown"
import { currentState } from "./currentState"
import { renderDropDown } from "./renderDropDown"
import { searchUrl } from "./urlHandlers"
import { data } from "./data"

export function addEvents() {
    mainContainer[0].addEventListener('keydown', (e) => {
        if (e.shiftKey && e.key === 'Enter') {
            console.log('shift + enter pressed')
            let queryToSearch = searchInput.value
            searchUrl(queryToSearch)
        }

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
            handleNavigation(e) // Handle navigation keys
            e.preventDefault() // Prevent default behavior for these keys
            return
        }

        if (e.altKey && e.key === 'h') {
            currentState.currentMode = 'H'
            console.log('Alt + H pressed!')
            currentModeNode.textContent = 'H'
            renderDropDown(data.history)
        }

        if (e.altKey && e.key === 't') {
            currentState.currentMode = 'T'
            console.log('Alt + T pressed!')
            currentModeNode.textContent = 'T'
            renderDropDown(data.tabs)
        }

        if (e.altKey && e.key === 'b') {
            currentState.currentMode = 'B'
            console.log('Alt + B pressed!')
            currentModeNode.textContent = 'B'
            renderDropDown(data.bookmarks)
        }

        if (e.altKey && e.key === 'f') {
            e.preventDefault()
            currentState.currentMode = 'F'
            console.log('Alt + F pressed!')
            currentModeNode.textContent = 'F'
            renderDropDown(data.topsites)
        }
        // COL mode change done in the input field
    })
}
