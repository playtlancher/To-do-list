import { saveTasks } from "./task.js";

export let isToggle = false;
const root = document.documentElement;

export function changeTheme() {
    isToggle = !isToggle;

    if (isToggle) {
        setRootStyle("--input-color", "black");
        setRootStyle('--border-color', 'darkgray');
        setRootStyle('--text-color', 'white');
        setRootStyle("--background-color", "#333");
        setRootStyle("--done-task-color", "#505050");

    } else {
        setRootStyle("--input-color", "white");
        setRootStyle('--border-color', 'lightgray');
        setRootStyle('--text-color', 'black');
        setRootStyle("--background-color", "white");
        setRootStyle("--done-task-color", "#757575 ");

    }
    saveTasks();

}

export function setTheme(status) {
    if (status === true) {
        changeTheme()
    }
}
function setRootStyle(style, value) {
    root.style.setProperty(style, value)
}
export function initTheme(){
    document.getElementById("themeButton").addEventListener("click", changeTheme);
}
export function loadTheme(userAccount) {
    if (userAccount.theme)
        setTheme(userAccount.theme);
    }
