import Fuse from 'fuse.js';

const searchInput = document.getElementById("search");
const resultsContainer = document.getElementById("results");

const fuseOptions = {
    keys: ["title", "url"],
    threshold: 0.4,
};

let fuse;

let tabs = [];
async function getTabs() {
    try {
        tabs = await chrome.tabs.query({}); // Fetch all the tabs
        tabs.forEach((tab, index) => {
            console.log(`Tab ${index + 1}:`);
            console.log(`ID: ${tab.id}`);
            console.log(`Title: ${tab.title}`);
            console.log(`URL: ${tab.url}`);
            console.log(`-----------------------------`);
        });

        fuse = new Fuse(tabs, fuseOptions);
        renderDropDown(tabs); // Render all tabs initially
    } catch (error) {
        console.error("Error fetching tabs: ", error);
    }
}

function renderDropDown(filteredTabs, highlightMax = false) {
    resultsContainer.innerHTML = "";

    let limitedResults = filteredTabs.slice(0, 7); // Limit results to 7

    limitedResults.forEach((tab, index) => {
        const li = document.createElement("li");

        // Set the text to include both title and URL
        li.innerHTML = `<strong>${tab.title}</strong><br><small>${tab.url}</small>`;
        li.classList.add("result-item"); // Add a class for styling

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

// Event listener for search input
searchInput.addEventListener("keydown", (e) => {
    let query = e.target.value.trim();
    console.log(query);

    if (query === "") {
        renderDropDown(tabs);
    } else {
        let fuzzres = fuse.search(query);
        let filteredTabs = fuzzres.map((result) => result.item);
        renderDropDown(filteredTabs, true); // Pass true to highlight the max score
    }

    if (e.key === "Enter") {
        let first_result = resultsContainer.querySelector("li");
        if (first_result) {
            first_result.click();
            console.log("clicked");
        }
    }
});

getTabs();

