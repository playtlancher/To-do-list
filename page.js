import { loadTasks } from "./task.js";
import { loadTheme } from "./theme.js";

export function initPage(account) {
    loadTheme(account);
    loadTasks(account);
    showTaskPage();
}
function showTaskPage() {
    const taskPage = document.getElementById("task-page");
    taskPage.classList.remove("display-none");
}
