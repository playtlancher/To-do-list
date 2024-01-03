import {addTaskByButton, loadTasks, loadTheme, fetchAndFillList} from "./task.js";
import {changeTheme} from "./theme.js";
import {closeModal} from "./modal.js";


window.onload = function () {
    loadTheme();
    loadTasks();
    fetchAndFillList();
};


function main() {
    document.getElementById("add-button").addEventListener("click", addTaskByButton);
    document.getElementById("themeButton").addEventListener("click", changeTheme)
    document.getElementById("modal-btn").addEventListener("click", closeModal)
    document.getElementById("clear-button").addEventListener("click", function () {
        localStorage.removeItem("tasks");
        localStorage.removeItem("status");
        let taskList = document.getElementById("task-list");
        let pagination = document.getElementById("pagination-container");
        taskList.innerHTML = "";
        pagination.innerHTML = "";
    });
}
main();