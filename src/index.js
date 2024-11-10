import { setThemeColor } from './colors'
import { currentState, getCurWindow } from './currentState'
import { addEvents } from './containerEventListeners'
import { getTabs, getHistory, getTopSites, getBookmarks } from './getData'
import { searchInputEventListener } from './searchInputEventListener'

console.log('current window id' + currentState.currentWindowId)

// Event listener for search input
addEvents()
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
