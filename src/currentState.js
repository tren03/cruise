export const currentState = {
    currentIndex: 0,
    currentWindowId: null,
    currentMode: 'T', // The Default mode is always T
}
export async function getCurWindow() {
    try {
        let curWindow = await chrome.windows.getCurrent()
        currentState.currentWindowId = curWindow.id
    } catch (err) {
        console.log('err getting current window id')
    }
}
