import {setTheme} from "./theme.js";
import {openModal} from "./modal.js";

let currentPage = 0;
let rows = 5;

export function saveTasks() {
    let taskList = document.getElementById("task-list");
    // let checkbox = document.getElementsByClassName("checkbox");
    let tasks = [];
    let taskCheckStatus = [];
    if (taskList) {
        for (let i = 0; i < taskList.children.length; i++) {
            let taskSpan = taskList.children[i].querySelector("span");
            let status = taskList.children[i].querySelector("input").checked;
            taskCheckStatus.push(status);
            if (taskSpan) {
                tasks.push(taskSpan.textContent);
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("status", JSON.stringify(taskCheckStatus));
    }
}

export function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let status = JSON.parse(localStorage.getItem("status"));

    if (tasks && status) {
        for (let i = 0; i < tasks.length; i++) {
            addTask(tasks[i],status[i]);
        }
    }
    setTheme(localStorage.getItem("theme"));
    displayPagination();
    displayList();
}


export function addTaskByButton() {
    let taskText = document.getElementById("task-input");
    if (taskText.value !== "") {
        addTask(taskText.value);
        taskText.value = "";
    }

}

export function addTask(taskText , status = false) {
    let taskList = document.getElementById("task-list");

    let taskItem = document.createElement("li");
    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskItem.appendChild(taskSpan);

    let removeButton = document.createElement("Button");
    removeButton.textContent = "remove";
    removeButton.addEventListener("click", function () {
        taskItem.classList.add('disappear-animation');
        taskItem.addEventListener("animationend", function () {
            taskList.removeChild(taskItem);
            saveTasks();
        })
    })
    let editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.addEventListener("click", function () {
        openModal(taskSpan);
    })
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = status;
    if (checkbox.checked) {
        taskSpan.style.transform = "rotateX(360deg)";
        taskSpan.style.textDecoration = "line-through";
    }
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            taskSpan.style.transform = "rotateX(360deg)";
            taskSpan.style.textDecoration = "line-through";
        } else {
            taskSpan.style.transform = "rotateX(0deg)";
            taskSpan.style.textDecoration = "none";
        }
        saveTasks()
    })
    taskItem.classList.add('fade-in');

    taskItem.appendChild(editButton);
    taskItem.appendChild(removeButton);
    taskItem.appendChild(checkbox);

    taskList.appendChild(taskItem);
    saveTasks()

}


export function displayPagination() {
    let taskList = document.getElementById("task-list");
    console.log(taskList.children.length)
    let totalPages = Math.ceil(taskList.children.length / rows);
    console.log(totalPages)
    let paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.add("pagination-btn");
        pageButton.addEventListener("click", function () {
            displayList(i);
        })
        paginationContainer.appendChild(pageButton);
    }
}


export function displayList(pageNumber = 1) {
    if (currentPage !== pageNumber) {
        let taskList = document.getElementById("task-list");
        let start = (pageNumber - 1) * rows;
        let end = pageNumber * rows;
        for (let i = 0; i < taskList.children.length; i++) {
            if (i >= start && i < end) {
                taskList.children[i].style.display = "flex";
            } else {
                taskList.children[i].style.display = "none";
            }
        }
        currentPage = pageNumber;
    }
}