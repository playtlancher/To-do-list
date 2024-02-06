import { loadTasks, numberOfTasksNow, numberOfTasks, numberOfComplited, changeUser, saveUsers } from "./task.js";
import { changePasswordModal } from "./modal.js";
import { showLogin } from "./loginLogic.js";
import { div } from "./utils.js";

const personalButton = document.getElementById("personal-account-button");
const taskButton = document.getElementById("task-button");
const personalAccount = document.getElementById("personal-account");
const taskPage = document.getElementById("task-page");
const numberOfComplitedSpan = document.getElementById("number-of-complited");
const tasksNowSpan = document.getElementById("tasks-at-this-moment");
const numberOfTasksSpan = document.getElementById("number-of-tasks");
const changePasswordButton = document.getElementById("change-password-button");
const taskList = document.getElementById("task-list");
const logOutButton = document.getElementById("log-out-button");
const deleteAccountButton = document.getElementById("delete-account-button");
const footer = document.querySelector("footer");
const limiter = document.getElementById("limiter");
const usernameH1 = document.getElementById("username-h1");


let userAccount;

export function initPage(account) {
    userAccount = account;
    loadTasks(userAccount);
    showTaskPage();
    personalButton.classList.remove("display-none");
    taskButton.addEventListener("click", hidePersonalAccount);
    personalButton.addEventListener("click", showPersonalAccount);
    changePasswordButton.addEventListener("click", changePassword);
    logOutButton.addEventListener("click", logOut);
    deleteAccountButton.addEventListener("click", deleteAccount);
}
function showTaskPage() {
    const taskPage = document.getElementById("task-page");
    taskPage.classList.remove("display-none");
}


function showPersonalAccount() {
    taskButton.classList.remove("display-none");
    personalAccount.classList.remove("display-none");
    taskPage.classList.add("display-none");
    personalButton.classList.add("display-none");
    footer.classList.add("display-none");
    usernameH1.textContent = userAccount.username;
    numberOfComplitedSpan.innerHTML = div(numberOfComplited, {}) + "Complited";
    tasksNowSpan.innerHTML = div(numberOfTasksNow, {}) + "Tasks now";
    numberOfTasksSpan.innerHTML = div(numberOfTasks,{})+"All Tasks";
}
function hidePersonalAccount() {
    taskButton.classList.add("display-none");
    personalAccount.classList.add("display-none");
    taskPage.classList.remove("display-none");
    personalButton.classList.remove("display-none");
    footer.classList.remove("display-none");
}

function changePassword() {
    changePasswordModal(userAccount);
}
function logOut() {
    changeUser("");
    taskList.innerHTML = "";
    showLogin();
    taskButton.classList.add("display-none");
    personalAccount.classList.add("display-none");
    taskPage.classList.add("display-none");
    limiter.classList.remove("display-none");
    numberOfTasksNow = 9;
}
function deleteAccount() {
    logOut();
    const users = JSON.parse(localStorage.getItem("users"));
    const index = users.findIndex(user => user.username === userAccount.username);
    users.splice(index, 1);
    saveUsers(users);
}