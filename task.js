import {setTheme} from "./theme.js";
import {openEditModal, openInfoModal} from "./modal.js";

let currentPage = 0;
let rows = 5;

export function saveTasks() {
    let taskList = document.getElementById("task-list");
    let tasks = [];
    let taskCheckStatus = [];
    let descriptions = [];
    if (taskList) {
        for (let i = 0; i < taskList.children.length; i++) {
            let taskSpan = taskList.children[i].querySelector("span");
            let status = taskList.children[i].querySelector("input");
            let description = taskList.children[i].querySelector("p");
            tasks.push(taskSpan.textContent);
            taskCheckStatus.push(status.checked);
            descriptions.push(description.textContent);

        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("status", JSON.stringify(taskCheckStatus));
        localStorage.setItem("descriptions", JSON.stringify(descriptions));
    }
}

export function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let status = JSON.parse(localStorage.getItem("status"));
    let descriptions = JSON.parse(localStorage.getItem("descriptions"));

    if (tasks) {
        for (let i = 0; i < tasks.length; i++) {
            addTask(tasks[i], descriptions[i], status[i]);
        }
    }
    displayPagination();
    displayList();
}

export function loadTheme() {
    setTheme(localStorage.getItem("theme"));
}


export function addTaskByButton() {
    let header = document.getElementById("header-input");
    let description = document.getElementById("text-input");
    if (header.value !== "" && description.value !== "") {
        addTask(header.value, description.value);
        header.value = "";
        description.value = "";
    }

}

export function addTask(taskText, description, status = false) {
    let taskList = document.getElementById("task-list");

    let taskItem = document.createElement("li");
    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;


    let descriptionText = document.createElement("p");
    descriptionText.textContent = description;
    descriptionText.style.display = "none";


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
        openEditModal(taskSpan);
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


    taskItem.appendChild(taskSpan);
    taskItem.appendChild(descriptionText);
    taskItem.appendChild(editButton);
    taskItem.appendChild(removeButton);
    taskItem.appendChild(checkbox);
    taskItem.addEventListener("click", function (event) {
        let target = event.target;
        if (target.tagName === 'LI' || target.tagName === "SPAN") {
            openInfoModal(taskItem);
        }
    })

    taskList.appendChild(taskItem);
    saveTasks()

}


export function displayPagination() {
    let taskList = document.getElementById("task-list");
    let totalPages = Math.ceil(taskList.children.length / rows);
    let paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";
    if (totalPages !== 1) {
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

export async function fetchAndFillList() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const json = await response.json();

        for (let i = 0; i < 30; i++) {
            let text = json[i].title;
            let status = json[i].completed;
            addTask(text, status);
        }
        let taskList = document.getElementById("task-list");
        for (let i = rows; i < taskList.children.length; i++) {
            taskList.children[i].style.display = "none";
        }

        displayPagination();
        displayList();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

