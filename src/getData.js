import Fuse from 'fuse.js'
import { data } from './data'
import { currentState } from './currentState'
import { fuseVariables } from './fuseVariables'
import { renderDropDown } from './renderDropDown'
import { fuseOptions, bookmarkFuseOptions } from './fuseOpts'

// Getting all active tabs
export async function getTabs() {
    try {
        data.tabs = await chrome.tabs.query({}) // Fetch all the tabs
        fuseVariables.fuseTab = new Fuse(data.tabs, fuseOptions)
        if (currentState.currentMode === 'T') {
            renderDropDown(data.tabs) // Render all tabs initially
        }
    } catch (error) {
        console.error('Error fetching tabs: ', error)
    }
}

// Getting History details
export async function getHistory() {
    try {
        data.history = await chrome.history.search({
            text: '',
        })

        // console.log('history array len ' + data.history.length)
        // console.log('history fields ' + JSON.stringify(data.history[0]))
        fuseVariables.fuseHistory = new Fuse(data.history, fuseOptions)
        if (currentState.currentMode === 'H') {
            renderDropDown(data.history, true) // Render all tabs initially
        }
    } catch (err) {
        console.log('problem in fetching history ' + err)
    }
}

// Getting top sites
export async function getTopSites() {
    try {
        data.topsites = await chrome.topSites.get()
        console.log('these are your top sites', data.topsites)
        fuseVariables.fuseTopSites = new Fuse(data.topsites, fuseOptions)
        if (currentState.currentMode === 'F') {
            renderDropDown(data.topsites, true)
        }
    } catch (err) {
        console.log('problem in fetching topsites ' + err)
    }
}

// Getting all bookmarks
export async function getBookmarks() {
    try {
        let tree = await chrome.bookmarks.getTree()
        console.log('tree + ', tree)
        data.bookmarks = extractLinks(tree)
        console.log(data.bookmarks)
        fuseVariables.fuseBookmark = new Fuse(
            data.bookmarks,
            bookmarkFuseOptions
        )
        if (currentState.currentMode === 'B') {
            renderDropDown(data.bookmarks, true)
        }
    } catch (err) {
        console.log('problem in fetching links ' + err)
    }
}

// traverse bookmark tree
function extractLinks(nodes) {
    let links = []
    let parentMap = new Map()
    function traverse(node) {
        if (node.url) {
            links.push({
                title: node.title,
                url: node.url,
                parent: node.parentId,
            })
        }
        if (node.children) {
            parentMap.set(node.id, node.title)
            node.children.forEach(traverse) // Traverse child nodes (folders)
        }
    }
    nodes.forEach(traverse)

    console.log('parent map ', parentMap)
    links.forEach((obj) => {
        obj.parent = parentMap.get(obj.parent)
    })

    return links
}
