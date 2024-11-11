import { setThemeColor } from './colors'
import { currentState, getCurWindow } from './currentState'
import { containerEventListeners } from './containerEventListeners'
import { getTabs, getHistory, getTopSites, getBookmarks } from './getData'
import { searchInputEventListener } from './searchInputEventListener'

console.log('current window id' + currentState.currentWindowId)
// Need to figure how to toggle tabs quickly and implement marks

// Event listener for search input
containerEventListeners()
searchInputEventListener()

// Get ID of current window, helps in switching tabs between browser insatnces
getCurWindow()

// Set theme from local storage, or set the default theme
setThemeColor()

// Get data needed for Cruise
getTabs()
getHistory()
getBookmarks()
getTopSites()
