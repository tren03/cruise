import Fuse from "fuse.js";

const searchInput = document.getElementById("search");
const resultsContainer = document.getElementById("results");
const mainContainer = document.getElementsByClassName("main-container");
const currentMode = document.getElementById("mode")

const fuseOptions = {
    keys: ["title", "url"],
    threshold: 0.4,
};

let fuse;
let currentIndex = 0;
let tabs = [];
let curwindowid;
let isCurWindow;

// getting id of current window to check if we need to switch focus to another window
let curwindow = await chrome.windows.getCurrent();
curwindowid = curwindow.id;
console.log("current window id" + curwindowid);

async function getTabs() {
    try {
        tabs = await chrome.tabs.query({}); // Fetch all the tabs
        tabs.forEach((tab, index) => {
            if (tab.windowId == curwindowid) {
                isCurWindow = true;
            } else {
                isCurWindow = false;
            }

            console.log(`Tab ${index + 1}:`);
            console.log(`ID: ${tab.id}`);
            console.log(`Title: ${tab.title}`);
            console.log(`URL: ${tab.url}`);
            console.log(`Window ID: ${tab.windowId}`);
            console.log("is it in cur window" + isCurWindow);

            console.log(`-----------------------------`);
        });

        fuse = new Fuse(tabs, fuseOptions);
        renderDropDown(tabs, true); // Render all tabs initially
    } catch (error) {
        console.error("Error fetching tabs: ", error);
    }
}

async function getHistory(){
     
}

// Rendering dropdown
function renderDropDown(filteredTabs, highlightMax) {
    resultsContainer.innerHTML = "";
    currentIndex = 0;

    let limitedResults = filteredTabs.slice(0, 6); // Limit results to 7

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

        // Set the text to include both title and URL
        let inWindow = "";
        if (tab.windowId != curwindowid) {
            inWindow = " (other tab)";
        }
        li.innerHTML = `<strong>${tab.title}</strong><br><small>${tab.url}+${inWindow}</small>`;
        li.classList.add("result-item"); // Add a class for styling
        li.setAttribute("data-tab-id", tab.id); // Store tab ID
        li.setAttribute("data-search-element", false); // Store tab ID
        li.setAttribute("data-window-id", tab.windowId);

        // Highlight the first result (highest score)
        if (highlightMax && index === 0) {
            li.classList.add("highlight"); // You can define this class in CSS to apply styles (like background color)
        }

        // On click, switch to the clicked tab
        li.addEventListener("click", () => {
            chrome.tabs.update(tab.id, { active: true }); // Switch to the clicked tab
        });

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

async function searchUrl() {
    try {
        let urlValue = searchInput.value;
        // we use encoded uri component so that we can pass strings like "hwllo world" with spaces to the url, spaces get converted to %20
        let finalUrlValue =`https://www.google.com/search?q=${encodeURIComponent(urlValue)}`; 
        let create = await chrome.tabs.create({url:finalUrlValue});
        console.log(create);
    } catch (err) {
        console.log("error in creating tab"+err);
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
        items[0].click(); // Trigger click on the selected item
        console.log("you want to search the web");

        searchUrl()
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
        let tabWindow = items[currentIndex].getAttribute("data-window-id");
        if (tabWindow != curwindowid) {
            focusWindow(tabWindow);
        }
        console.log("the clicked tab has window id " + tabWindow);
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
        renderDropDown(tabs, true);
    } else {
        let fuzzres = fuse.search(query);
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
        console.log("Alt + H pressed!");
        currentMode.textContent = "H"

    }
    
    
    if (e.altKey && e.key === "t") {
        console.log("Alt + T pressed!");
        currentMode.textContent = "T" 

    }

});

getTabs();
