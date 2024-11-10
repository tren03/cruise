import { fuseOptions } from "./fuseOpts";

// Getting all active tabs
// curWindowid - global 
// isCurWindow - global
export async function getTabs() {
  try {
    tabs = await chrome.tabs.query({}); // Fetch all the tabs
    tabs.forEach((tab, _) => {
      if (tab.windowId == curwindowid) {
        isCurWindow = true;
      } else {
        isCurWindow = false;
      }
      /*
      console.log(tab);

                 console.log(`Tab ${index + 1}:`);
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
