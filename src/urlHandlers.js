// called only only when bookmark,topsite,history call with real urls
export async function searchValidUrl(urlValue) {
    try {
        let create = await chrome.tabs.create({ url: urlValue })
        console.log(create)
    } catch (err) {
        console.log('error in creating tab of real url' + err)
    }
}

// called in case of no match
export async function searchUrl(urlValue) {
    try {
        // we use encoded uri component so that we can pass strings like "hwllo world" with spaces to the url, spaces get converted to %20
        let finalUrlValue = `https://www.google.com/search?q=${encodeURIComponent(urlValue)}`
        let create = await chrome.tabs.create({ url: finalUrlValue })
        console.log(create)
    } catch (err) {
        console.log('error in creating tab of not real url' + err)
    }
}
