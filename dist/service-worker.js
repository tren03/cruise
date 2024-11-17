let CUR, PREV

chrome.tabs.onActivated.addListener(async function () {
    let t = await getCurrentTab()
    PREV = CUR
    CUR = t
    console.log('current tab_id and url = ' + CUR.id + ' ' + CUR.url)
    console.log('prev tab_id and url = ' + PREV.id + ' ' + PREV.url)
})

// chrome.tabs.onUpdated.addListener(function () {
//     console.log('huh update')
// })
//
// chrome.tabs.onRemoved.addListener(function () {
//     console.log('tab removed')
// })
//
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true }
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions)
    return tab
}
chrome.commands.onCommand.addListener(async (command) => {
    console.log(`Command "${command}" triggered, you want to toggle tabs`)
    chrome.tabs.update(PREV.id, { active: true });
})
