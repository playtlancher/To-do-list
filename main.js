import {changeTheme, setTheme} from "./theme.js";

function saveTasks() {
    let taskList = document.getElementById("task-list");
    let tasks = [];
    if (taskList) {
        for (let i = 0; i < taskList.children.length; i++) {
            let taskSpan = taskList.children[i].querySelector("span");
            if (taskSpan) {
                tasks.push(taskSpan.textContent);
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function loadTasks() {
    setTheme(localStorage.getItem("theme"));
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks) {
        for (let i = 0; i < tasks.length; i++) {
            addTask(tasks[i]);
        }
    }
}


function addTaskByButton() {
    let taskText = document.getElementById("task-input");
    if (taskText.value !=="") {
        addTask(taskText.value);
        taskText.value = "";
    }

}

function addTask(taskText) {
    let taskList = document.getElementById("task-list");

    let taskItem = document.createElement("li");
    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskItem.appendChild(taskSpan);

    let removeButton = document.createElement("Button");
    removeButton.textContent = "remove";
    removeButton.addEventListener("click", function () {
        taskList.removeChild(taskItem);
        saveTasks();

    })
    let editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.addEventListener("click", function () {
        let newText = prompt("Enter new text", taskText);
        if (newText !== null) {
            taskSpan.textContent = newText;
            saveTasks()
        }
    })

    taskItem.appendChild(editButton);
    taskItem.appendChild(removeButton);

    taskList.appendChild(taskItem);
    saveTasks()

}

document.getElementById("add-button").addEventListener("click", addTaskByButton);
window.onload = loadTasks;
document.getElementById("themeButton").addEventListener("click",changeTheme)