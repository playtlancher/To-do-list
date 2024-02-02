import { openEditModal, openInfoModal } from "./modal.js";
import { createEl, createHTML } from "./utils.js";

let currentPage = 0;
const rows = 3;
let totalPages;
export let userAccount;
let isLogin = false;
export let numberOfComplited = 0;
export let numberOfTasks = 0;
export let numberOfTasksNow = 0;

class Task {
    date;
    task;
    description;
    status;
}

export function saveTasks() {
    const taskList = document.getElementById("task-list");


    let tasks = [];
    if (taskList && isLogin) {
        for (let i = 0; i < taskList.children.length; i++) {
            const task = new Task();
            const taskText = taskList.children[i].querySelector(".header").textContent;
            const dateEl = taskList.children[i].querySelector(".date").textContent;
            const description = taskList.children[i].querySelector(".description").textContent;
            const status = taskList.children[i].querySelector(".status").textContent;

            task.task = taskText;
            task.date = dateEl;
            task.description = description;
            task.status = status;
            tasks.push(task);
        }
        if (userAccount !== "") {
            userAccount.tasks = tasks;
            userAccount.numberOfComplited = numberOfComplited;
            userAccount.numberOfTasks = numberOfTasks

            const users = JSON.parse(localStorage.getItem("users"));
            const index = users.findIndex(user => user.username === userAccount.username);

            if (index !== "-1")
                users[index] = userAccount;

            localStorage.setItem("users", JSON.stringify(users));
        }
    }
}

export function loadTasks(account) {
    userAccount = account;

    document.getElementById("add-button").addEventListener("click", addTaskByButton);

    let tasks = account.tasks;
    if (userAccount.numberOfComplited !== undefined)
        numberOfComplited = userAccount.numberOfComplited;
    if (userAccount.numberOfTasks !== undefined)
        numberOfTasks = userAccount.numberOfTasks;

    if (tasks) {
        tasks.forEach(task => addTask(task.task, task.description, task.date, task.status));
    }
    isLogin = true;

    displayPagination();
    displayList();
}


export function addTaskByButton() {
    let header = document.getElementById("header-input");
    let description = document.getElementById("text-input");
    let dateInput = document.getElementById("deadline");
    let date = getCurrentDate() + ":" + dateInput.value;
    if (header.value !== "" && description.value !== "" && dateInput.value !== "") {
        addTask(header.value, description.value, date, "Scheduled");
        header.value = "";
        description.value = "";
        dateInput.value = "";
    }
    numberOfTasks++;
}

export function addTask(taskText, description, date, status) {

    const taskItem = createEl("li");
    const taskList = document.getElementById("task-list");

    let html = createHTML(taskText, { tag: "span", style: "", classes: ["header"] });
    html += createHTML(date, { tag: "span", style: "display: none", classes: ["date"] });
    html += createHTML(description, { tag: "span", style: "display: none", classes: ["description"] });
    html += createHTML(status, { tag: "span", style: "display: none", classes: ["status"] });
    html += createHTML("delete", { tag: "button", style: "", classes: ["delete-button"] });
    html += createHTML("edit", { tag: "button", style: "", classes: ["edit edit-button"] });
    html += createHTML("", { tag: "input", type: "checkbox", style: "", classes: ["checkbox"] });
    taskItem.innerHTML = html;

    const deleteButton = taskItem.querySelector(".delete-button");
    const editButton = taskItem.querySelector(".edit");
    const header = taskItem.querySelector(".header");
    const checkbox = taskItem.querySelector(".checkbox");
    const statusEl = taskItem.querySelector(".status");

    deleteButton.addEventListener("click", function () {
        taskItem.classList.add('fade-out');
        taskItem.addEventListener("animationend", function () {
            numberOfTasksNow--;
            taskList.removeChild(taskItem);
            displayPagination();
            displayList(totalPages);
            saveTasks();
        })
    })

    editButton.addEventListener("click", function () {
        openEditModal(taskItem);
    });

    if (status === "Completed") {
        checkbox.checked = true
        header.classList.add("strikethrough-animation");
        taskItem.classList.add("done");
        if (isLogin)
            numberOfComplited++;
    }
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            statusEl.textContent = "Completed";
            header.classList.add("strikethrough-animation");
            taskItem.classList.add("done");
            numberOfComplited++;
        } else {
            statusEl.textContent = "Scheduled";
            header.classList.remove("strikethrough-animation");
            taskItem.classList.remove("done");
            numberOfComplited--;
        }
        saveTasks()
    })

    taskItem.addEventListener("click", function (event) {
        let target = event.target;
        if (target.tagName === 'LI' || target.tagName === "SPAN") {
            openInfoModal(taskItem);
        }
    })
    numberOfTasksNow++;
    taskItem.classList.add("fade-in");
    taskList.appendChild(taskItem);
    displayPagination();
    displayList(totalPages);
    saveTasks()

}
export function changeUser(user) {
    userAccount = user;
    saveTasks();
}
export function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

export function displayPagination() {
    let taskList = document.getElementById("task-list");
    totalPages = Math.ceil(taskList.children.length / rows);
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


function getCurrentDate() {
    const today = new Date();
    return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
}
