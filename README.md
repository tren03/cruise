# Cruise - A Fuzzy Finder for Tabs on Chromium-Based Browsers
## Introduction
****Cruise**** is a browser extension that lets you quickly fuzzy-find open tabs in any Chromium-based browser. It helps you efficiently navigate through your tabs using keyboard shortcuts, inspired by ****Telescope**** from Neovim.

## Features
- Quick Tab navigation
- Access to Tab, Bookmarks, History and Frequent sites all from a single interface
- Quick web searches 
- Customizable themes


## Shortcuts

Cruise provides several keyboard shortcuts to make navigation faster and more efficient:

- **Open Cruise Dialog**: `Alt + y` <br />
     Open Cruise to interact with its features.

- **Active Tab Mode**: `Alt + t`  
  Switch to and search through active tabs. If the tab is not in your current window, Cruise will bring the relevant window into focus.

- **History Mode**: `Alt + h`  
  Search through your browser's last 100 visited sites and navigate to a specific URL.

- **Bookmark Mode**: `Alt + b`  
  Search your saved bookmarks and quickly navigate to them.

- **Frequent Mode**: `Alt + f`  
  Search your most frequently visited websites.

- **Force Search**: `Shift + Enter`  
  Search the web with your query, regardless of the current mode or highlighted option.

- **Change Theme**: `/c`  
  Type `/c` in the input field to change the appearance of Cruise by selecting from available themes.

- **Help (Man Pages)**: `/h`  
  Type `/h` to bring up the Cruise manual pages for help and tips.


## Usage

Use `Alt +  Y` to open the Cruise dialog

### 1. Switching Between Modes:

Use `Alt + <key>` to switch between modes:

- `T` - Tabs
- `H` - History
- `B` - Bookmarks
- `F` - Most Frequent Sites
  
Click on any option shown or hit Enter to go the the highlighted option </br>
The Mode is indicated by a letter the the input bar to the left
  
https://github.com/user-attachments/assets/e13a0af0-753a-497c-8856-99de98a649cc


### 2. Command Mode Usage:
Use `/` to get into command mode

https://github.com/user-attachments/assets/35c8ec2e-ddaf-45ec-b253-8016dcd902df


### 3. Additional Features:
- Use `Shift + Enter` to search your query on the web, regardless of the mode you're in or the option you currently have selected.
- Cruise automatically adjusts its theme based on your browser's theme to improve readability.

****Dark Mode****

![2024-10-02-215217_1919x1080_scrot](https://github.com/user-attachments/assets/9e25f92b-5276-4ad6-8bcb-3be7cd6e902a)

****Light Mode****

![2024-10-02-220240_1919x1080_scrot](https://github.com/user-attachments/assets/1e64593d-4295-428a-84b3-c17389a051a7)

## Installation


Since I haven't published it on the Chrome Web Store yet (as there are a few more features I would like to add), the only way to use it right now is by cloning the repo and manually adding it to your extensions.
1. Clone or download the repository:
   
```sh
git clone https://github.com/tren03/cruise.git
```
3. Open your browser and navigate to chrome://extensions/.
4. Enable Developer mode (toggle on the top right).
5. Click Load unpacked and select the directory where you cloned the repository.
6. The extension is now loaded and ready to use.








