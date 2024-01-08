import {setTheme} from "./theme.js";
import {openEditModal, openInfoModal} from "./modal.js";

let currentPage = 0;
let rows = 5;

class Task {
    date;
    task;
    description;
    status;
}

export function saveTasks() {
    let taskList = document.getElementById("task-list");


    let tasks = [];

    if (taskList) {
        for (let i = 0; i < taskList.children.length; i++) {
            let task = new Task();
            let taskSpan = taskList.children[i].getElementsByClassName("header")[0].textContent;
            let dateEl = taskList.children[i].getElementsByClassName("date")[0].textContent;
            let description = taskList.children[i].getElementsByClassName("description")[0].textContent;
            let status = taskList.children[i].getElementsByClassName("status")[0].textContent;

            task.task = taskSpan;
            task.date = dateEl;
            task.description = description;
            task.status = status;
            tasks.push(task);

        }
        localStorage.setItem("tasks", JSON.stringify(tasks));

    }
}

export function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));


    if (tasks) {
        for (let i = 0; i < tasks.length; i++) {
            addTask(tasks[i].task, tasks[i].description, tasks[i].date, tasks[i].status);
        }
    }
    displayPagination();
    displayList();
}

export function loadTheme() {
    setTheme(localStorage.getItem("theme"));
}


export function addTaskByButton() {
    const today = new Date();
    let header = document.getElementById("header-input");
    let description = document.getElementById("text-input");
    let dateInput = document.getElementById("deadline");
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + ":" + dateInput.value;
    if (header.value !== "" && description.value !== "" && dateInput.value !== "") {
        addTask(header.value, description.value, date , "Scheduled");
        header.value = "";
        description.value = "";
        dateInput.value = "";
    }

}

export function addTask(taskText, description, date, status) {
    let taskList = document.getElementById("task-list");

    let taskItem = document.createElement("li");
    let taskHeader = document.createElement("span");
    taskHeader.textContent = taskText;
    taskHeader.classList.add("header");


    let taskDate = document.createElement("span");
    taskDate.textContent = date;
    taskDate.style.display = "none";
    taskDate.classList.add("date");


    let descriptionSpan = document.createElement("span");
    descriptionSpan.textContent = description;
    descriptionSpan.style.display = "none";
    descriptionSpan.classList.add("description");

    let statusSpan = document.createElement("span");
    statusSpan.style.display = "none";
    statusSpan.classList.add("status");
    statusSpan.textContent = status;

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
        openEditModal(taskItem);
    })


    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    if (status === "Completed") {
        checkbox.checked = true
        taskHeader.style.transform = "rotateX(360deg)";
        taskHeader.style.textDecoration = "line-through";
    }
    checkbox.addEventListener("change", function () {

        if (checkbox.checked) {
            statusSpan.textContent = "Completed";
            taskHeader.style.transform = "rotateX(360deg)";
            taskHeader.style.textDecoration = "line-through";
        } else {
            statusSpan.textContent = "Scheduled";
            taskHeader.style.transform = "rotateX(0deg)";
            taskHeader.style.textDecoration = "none";
        }
        saveTasks()
    })
    taskItem.classList.add('fade-in');


    taskItem.appendChild(taskHeader);
    taskItem.appendChild(descriptionSpan);
    taskItem.appendChild(taskDate);
    taskItem.appendChild(statusSpan);
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

