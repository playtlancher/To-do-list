import { loadTasks, numberOfTasksNow, numberOfTasks, numberOfComplited, changeUser, saveUsers } from "./task.js";
import { changePasswordModal } from "./modal.js";
import { showLogin } from "./loginLogic.js";

const personalButton = document.getElementById("personal-account-button");
const taskButton = document.getElementById("task-button");
const personalAccount = document.getElementById("personal-account");
const taskPage = document.getElementById("task-page");
const span = document.getElementById("reg-log-span");
const numberOfComplitedSpan = document.getElementById("number-of-complited");
const tasksNowSpan = document.getElementById("tasks-at-this-moment");
const numberOfTasksSpan = document.getElementById("number-of-tasks");
const changePasswordButton = document.getElementById("change-password-button");
const taskList = document.getElementById("task-list");
const logOutButton = document.getElementById("log-out-button");
const deleteAccountButton = document.getElementById("delete-account-button");

let userAccount;

export function initPage(account) {
    userAccount = account;
    loadTasks(userAccount);
    showTaskPage();
    initPersonalAccount(userAccount);
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

function initPersonalAccount(account) {
    const welcome = document.getElementById("welcome");
    welcome.textContent = `Welcome , ${account.username}`;
}
function showPersonalAccount() {
    taskButton.classList.remove("display-none");
    personalAccount.classList.remove("display-none");
    span.classList.add("display-none");
    taskPage.classList.add("display-none");
    personalButton.classList.add("display-none");
    numberOfComplitedSpan.textContent = `Number of complited tasks: ${numberOfComplited}`
    tasksNowSpan.textContent = `Number of tasks currently on page: ${numberOfTasksNow}`;
    numberOfTasksSpan.textContent = `Number of tasks for all time: ${numberOfTasks}`;
}
function hidePersonalAccount() {
    taskButton.classList.add("display-none");
    personalAccount.classList.add("display-none");
    span.classList.remove("display-none");
    taskPage.classList.remove("display-none");
    personalButton.classList.remove("display-none");
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
    taskPage.classList.add("display:none");

}
function deleteAccount() {
    logOut();
    const users = JSON.parse(localStorage.getItem("users"));
    const index = users.findIndex(user => user.username === userAccount.username);
    users.splice(index, 1);
    saveUsers(users);
}