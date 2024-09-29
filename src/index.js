import Fuse from "fuse.js";

const searchInput = document.getElementById("search");
const resultsContainer = document.getElementById("results");
const mainContainer = document.getElementsByClassName("main-container");
const currentModeNode = document.getElementById("mode");

const fuseOptions = {
    keys: ["title", "url"],
    threshold: 0.4,
};

// Fuse.js settings for bookmarks since they have parent field too
const bookmarkFuseOptions = {
    keys: [
        {
            name: "title",
            weight: 3,
        },
        {
            name: "url",
            weight: 2,
        },

        {
            name: "parent",
            weight: 1,
        },
    ],
    threshold: 0.4,
};

// To initialize fuse.js props
let fuseTab;
let fuseHistory;
let fuseTopSites;
let fuseBookmark;

// To highlight elements in list
let currentIndex = 0;

// Stores the actual data we search in
let tabs = [];
let history = [];
let topsites = [];
let bookmarks = [];

// For focusing on a tab in another window
let curwindowid;
let isCurWindow;

// For setting default mode, and to track change in mode
let currentMode = "T"; // The Default mode is always T

// Getting id of current window to check if we need to switch focus to another window
let curwindow = await chrome.windows.getCurrent();
curwindowid = curwindow.id;
console.log("current window id" + curwindowid);

// Getting all active tabs
async function getTabs() {
    try {
        tabs = await chrome.tabs.query({}); // Fetch all the tabs
        tabs.forEach((tab, index) => {
            if (tab.windowId == curwindowid) {
                isCurWindow = true;
            } else {
                isCurWindow = false;
            }

            /*           console.log(`Tab ${index + 1}:`);
                       console.log(`ID: ${tab.id}`);
                       console.log(`Title: ${tab.title}`);
                       console.log(`URL: ${tab.url}`);
                       console.log(`Window ID: ${tab.windowId}`);
                       console.log("is it in cur window" + isCurWindow);
           
                       console.log(`-----------------------------`);*/
        });

        fuseTab = new Fuse(tabs, fuseOptions);
        if (currentMode === "T") {
            renderDropDown(tabs, true); // Render all tabs initially
        }
    } catch (error) {
        console.error("Error fetching tabs: ", error);
    }
}

// Getting History details
async function getHistory() {
    try {
        history = await chrome.history.search({
            text: "",
        });

        console.log("history array len " + history.length);
        console.log("history fields " + JSON.stringify(history[0]));
        fuseHistory = new Fuse(history, fuseOptions);
        if (currentMode === "H") {
            renderDropDown(history, true); // Render all tabs initially
        }
    } catch (err) {
        console.log("problem in fetching history " + err);
    }
}

// Getting top sites
async function getTopSites() {
    try {
        topsites = await chrome.topSites.get();
        console.log("these are your top sites", topsites);
        fuseTopSites = new Fuse(topsites, fuseOptions);
        if (currentMode === "F") {
            renderDropDown(topsites, true);
        }
    } catch (err) {
        console.log("problem in fetching topsites " + err);
    }
}

// Getting all bookmarks
async function getBookmarks() {
    try {
        let tree = await chrome.bookmarks.getTree();
        console.log("tree + ", tree);
        bookmarks = extractLinks(tree);
        console.log(bookmarks);
        fuseBookmark = new Fuse(bookmarks, bookmarkFuseOptions);
        if (currentMode === "B") {
            renderDropDown(bookmarks, true);
        }
    } catch (err) {
        console.log("problem in fetching links " + err);
    }
}

// traverse bookmark tree
function extractLinks(nodes) {
    let links = [];
    let parentMap = new Map();
    function traverse(node) {
        if (node.url) {
            links.push({
                title: node.title,
                url: node.url,
                parent: node.parentId,
            });
        }
        if (node.children) {
            parentMap.set(node.id, node.title);
            node.children.forEach(traverse); // Traverse child nodes (folders)
        }
    }
    nodes.forEach(traverse);

    console.log("parent map ", parentMap);
    links.forEach((obj) => {
        obj.parent = parentMap.get(obj.parent);
    });

    return links;
}

// Rendering dropdown
function renderDropDown(filteredTabs, highlightMax) {
    resultsContainer.innerHTML = "";
    currentIndex = 0;

    let limitedResults = filteredTabs.slice(0, 6); // Limit results to 6

    // if no results, give option to search the web
    if (limitedResults.length == 0) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>Search the web for it</strong>`;
        li.classList.add("result-item"); // Add a class for styling
        li.classList.add("highlight"); // You can define this class in CSS to apply styles (like background color)
        li.setAttribute("data-search-element", true); // setting metadata for tab to search web
        resultsContainer.appendChild(li); // Append the list item to the unordered list
        return;
    }

    limitedResults.forEach((tab, index) => {
        const li = document.createElement("li");
        console.log("my current mode here " + currentMode);

        // Set the text to include both title and URL
        let inWindow = "";
        if (currentMode === "T") {
            if (tab.windowId != curwindowid) {
                inWindow = " (other tab)";
            }
        }

        // since bookmarks need to include category
        if (currentMode === "B") {
            li.innerHTML = `<strong>${tab.title}</strong><br><small>${tab.url} Category = ${tab.parent}</small>`;
            li.classList.add("result-item"); // Add a class for styling
            li.setAttribute("data-tab-id", tab.id); // Store tab ID
            li.setAttribute("data-search-element", false); // Store tab ID
        } else {
            li.innerHTML = `<strong>${tab.title}</strong><br><small>${tab.url}+${inWindow}</small>`;
            li.classList.add("result-item"); // Add a class for styling
            li.setAttribute("data-tab-id", tab.id); // Store tab ID
            li.setAttribute("data-search-element", false); // Store tab ID
        }

        if (currentMode === "T") {
            li.setAttribute("data-window-id", tab.windowId);
        }

        // Highlight the first result (highest score)
        if (highlightMax && index === 0) {
            li.classList.add("highlight"); // You can define this class in CSS to apply styles (like background color)
        }

        if (currentMode === "T") {
            // On click, switch to the clicked tab
            console.log("we are adding Tab event list");
            li.addEventListener("click", () => {
                chrome.tabs.update(tab.id, { active: true }); // Switch to the clicked tab
            });
        }

        if (currentMode === "H" || currentMode === "F" || currentMode === "B") {
            console.log(
                "we are adding Hist and topsites and bookmark event list",
            );
            li.addEventListener("click", () => {
                console.log("hist url : " + tab.url);
                searchValidUrl(tab.url);
            });
        }

        resultsContainer.appendChild(li); // Append the list item to the unordered list
    });
}

// To handle the highlighting of list values
function highlightItem(index) {
    const items = resultsContainer.querySelectorAll("li");
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add("highlight"); // Add the highlight class to the selected item
            item.scrollIntoView({ block: "nearest" }); // Scroll to the item if necessary
        } else {
            item.classList.remove("highlight"); // Remove the highlight class from other items
        }
    });
}

// called only only when bookmark,topsite,history call with real urls
async function searchValidUrl(urlValue) {
    try {
        let create = await chrome.tabs.create({ url: urlValue });
        console.log(create);
    } catch (err) {
        console.log("error in creating tab of real url" + err);
    }
}

// called in case of no match
async function searchUrl(urlValue) {
    try {
        // we use encoded uri component so that we can pass strings like "hwllo world" with spaces to the url, spaces get converted to %20
        let finalUrlValue = `https://www.google.com/search?q=${encodeURIComponent(urlValue)}`;
        let create = await chrome.tabs.create({ url: finalUrlValue });
        console.log(create);
    } catch (err) {
        console.log("error in creating tab of not real url" + err);
    }
}

// To handle the navigation between list elements
function handleNavigation(e) {
    const items = resultsContainer.querySelectorAll("li");

    if (
        items.length === 1 &&
        // html stores meta values as strings it seems, so i need to check for string when i search the data-search-element attribute
        items[0].getAttribute("data-search-element") === "true" &&
        e.key === "Enter"
    ) {
        console.log("you want to search the web");

        searchUrl(searchInput.value)
            .then(() => console.log("success in creating new tab"))
            .catch((err) => console.log("fail in creating new tab: " + err));

        return;
    }

    if (e.key === "ArrowDown") {
        currentIndex = (currentIndex + 1) % items.length; // Move down the list
        highlightItem(currentIndex);
    } else if (e.key === "ArrowUp") {
        currentIndex = (currentIndex - 1 + items.length) % items.length; // Move up the list
        highlightItem(currentIndex);
    } else if (e.key === "Enter" && currentIndex >= 0) {
        items[currentIndex].click(); // Trigger click on the selected item
        if (currentMode === "T") {
            let tabWindow = items[currentIndex].getAttribute("data-window-id");
            if (tabWindow != curwindowid) {
                focusWindow(tabWindow);
            }
            console.log("the clicked tab has window id " + tabWindow);
        }
    }
}

// To change window focus
async function focusWindow(targetWindowId) {
    try {
        // Update the target window to bring it into focus
        console.log("type of target window sent down " + typeof targetWindowId);
        let numberTarget = Number(targetWindowId);
        await chrome.windows.update(numberTarget, { focused: true });
        console.log(`Switched focus to window with ID: ${numberTarget}`);
    } catch (error) {
        console.error("Error switching focus to window: ", error);
    }
}

// Event listener for search input
searchInput.addEventListener("input", (e) => {
    let query = e.target.value.trim();
    if (query === "") {
        if (currentMode === "T") {
            renderDropDown(tabs, true);
        }

        if (currentMode === "H") {
            renderDropDown(history, true);
        }

        if (currentMode === "F") {
            renderDropDown(topsites, true);
        }

        if (currentMode === "B") {
            renderDropDown(bookmarks, true);
        }
    } else {
        let fuzzres;
        if (currentMode === "T") {
            console.log("search tab data");
            fuzzres = fuseTab.search(query);
        }

        if (currentMode === "H") {
            console.log("search history data");
            fuzzres = fuseHistory.search(query);
        }

        if (currentMode === "F") {
            console.log("search tab topsite data");
            fuzzres = fuseTopSites.search(query);
        }
        if (currentMode === "B") {
            console.log("search tab bookmark data");
            fuzzres = fuseBookmark.search(query);
        }
        let filteredTabs = fuzzres.map((result) => result.item);
        renderDropDown(filteredTabs, true); // Pass true to highlight the max score
    }
});

mainContainer[0].addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
        handleNavigation(e); // Handle navigation keys
        e.preventDefault(); // Prevent default behavior for these keys
        return;
    }

    if (e.altKey && e.key === "h") {
        currentMode = "H";
        console.log("Alt + H pressed!");
        currentModeNode.textContent = "H";
        renderDropDown(history, true);
    }

    if (e.altKey && e.key === "t") {
        currentMode = "T";
        console.log("Alt + T pressed!");
        currentModeNode.textContent = "T";
        renderDropDown(tabs, true);
    }

    if (e.altKey && e.key === "b") {
        currentMode = "B";
        console.log("Alt + B pressed!");
        currentModeNode.textContent = "B";
        renderDropDown(bookmarks, true);
    }

    if (e.altKey && e.key === "f") {
        e.preventDefault();
        currentMode = "F";
        console.log("Alt + F pressed!");
        currentModeNode.textContent = "F";
        renderDropDown(topsites, true);
    }
});

getBookmarks();
getTopSites();
getHistory();
getTabs();
