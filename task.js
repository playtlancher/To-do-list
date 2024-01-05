import {setTheme} from "./theme.js";
import {openEditModal, openInfoModal} from "./modal.js";

let currentPage = 0;
let rows = 5;

class Task {
    date;
    task;
    status;
    description;
}

export function saveTasks() {
    let taskList = document.getElementById("task-list");


    let tasks = [];

    if (taskList) {
        for (let i = 0; i < taskList.children.length; i++) {
            let task = new Task();
            let taskSpan = taskList.children[i].getElementsByClassName("task")[0].textContent;
            let dateEl = taskList.children[i].getElementsByClassName("date")[0].textContent;
            let description = taskList.children[i].getElementsByClassName("description")[0].textContent;
            let status = taskList.children[i].querySelector("input").checked;

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
        addTask(header.value, description.value, date);
        header.value = "";
        description.value = "";
        dateInput.value = "";
    }

}

export function addTask(taskText, description, date, status = false) {
    let taskList = document.getElementById("task-list");

    let taskItem = document.createElement("li");
    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.classList.add("task");


    let taskDate = document.createElement("span");
    taskDate.textContent = date;
    taskDate.style.display = "none";
    taskDate.classList.add("date");


    let descriptionText = document.createElement("span");
    descriptionText.textContent = description;
    descriptionText.style.display = "none";
    descriptionText.classList.add("description");


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
    taskItem.appendChild(taskDate);
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

