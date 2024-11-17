let CUR, PREV

async function getPrevTab() {
    // goal is to get the most recently used tab from list of tabs in current window
    let tabs = await chrome.tabs.query({ currentWindow: true })

    // Sort tabs by lastAccessed in descending order
    tabs.sort((a, b) => b.lastAccessed - a.lastAccessed)

    // return PREV
    if (tabs.length == 1) {
        return tabs[0]
    } else {
        return tabs[1]
    }
}

chrome.commands.onCommand.addListener(async () => {
    PREV = await getPrevTab()
    console.log('PREV to switch : ' + PREV)
    chrome.tabs.update(PREV.id, { active: true })
})
