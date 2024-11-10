// fuse.js accept array of objects
export const availableColors = [
  {
    color: "Orange",
    code: "#FFA500",
  },
  {
    color: "Green",
    code: "#67BB67",
  },
  {
    color: "Pastel Red",
    code: "#FF8383",
  },
  {
    color: "Gray",
    code: "#A8A8A8",
  },
  {
    color: "Teal",
    code: "#7DB7B7",
  },
];

// Takes a hex code of the color and changes css variable
export function updateThemeColor(color) {
  let themeToSet;
  console.log("updating theme");
  if (localStorage.getItem("cruise-theme") === null) {
    localStorage.setItem("cruise-theme", "#00ff00");
  } else {
    localStorage.setItem("cruise-theme", color);
  }
  themeToSet = localStorage.getItem("cruise-theme");
  document.documentElement.style.setProperty("--theme-color", themeToSet);
}

export function setThemeColor() {
  let themeToSet;
  console.log("setting theme");
  if (localStorage.getItem("cruise-theme" === null)) {
    localStorage.setItem("cruise-theme", "#00ff00");
  }
  themeToSet = localStorage.getItem("cruise-theme");
  document.documentElement.style.setProperty("--theme-color", themeToSet);
}
