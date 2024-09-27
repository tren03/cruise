// Get the search input element and the results container
const searchInput = document.getElementById("search");
const resultsContainer = document.getElementById("results");

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
        renderDropDown(tabs)
    } catch (error) {
        console.error("Error fetching tabs: ", error);
    }
}

function renderDropDown(tabs) {
    /*
    tabs.forEach((tab) => {
        const li = document.createElement("li");
        li.textContent = tab.title;
        li.classList.add("result-item"); // Add a class for styling

        // On click, switch to the clicked tab
        li.addEventListener("click", () => {
            chrome.tabs.update(tab.id, { active: true }); // Switch to the clicked tab
        });

        resultsContainer.appendChild(li); // Append the list item to the unordered list
    });*/
    
        let li = document.createElement("li");
        li.textContent = tabs[0].title;
        li.classList.add("result-item"); // Add a class for styling
        resultsContainer.appendChild(li)
        let li2 = document.createElement("li");
        li2.textContent = tabs[1].title;
        li2.classList.add("result-item"); // Add a class for styling
        resultsContainer.appendChild(li2)
    
}
getTabs();
