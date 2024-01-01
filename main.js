import {addTaskByButton,loadTasks} from "./task.js";
import {changeTheme} from "./theme.js";


document.getElementById("add-button").addEventListener("click", addTaskByButton);
window.onload = loadTasks;

document.getElementById("themeButton").addEventListener("click",changeTheme)