import { loadTasks, numberOfTasksNow, numberOfTasks, numberOfComplited, changeUser, saveUsers } from "./task.js";
import { changePasswordModal, changeAvatarModal } from "./modal.js";
import { showLogin } from "./loginLogic.js";
import { div } from "./utils.js";

const personalButton = document.getElementById("personal-account-button");
const taskButton = document.getElementById("task-button");
const personalAccount = document.getElementById("personal-account");
const taskPage = document.getElementById("task-page");
const numberOfComplitedSpan = document.getElementById("number-of-complited");
const tasksNowSpan = document.getElementById("tasks-at-this-moment");
const numberOfTasksSpan = document.getElementById("number-of-tasks");
const taskList = document.getElementById("task-list");
const footer = document.querySelector("footer");
const limiter = document.getElementById("limiter");
const avatarButton = document.getElementById("change-avatar-button");
const userAvatar = document.getElementById("avatar-img");


let userAccount;

export function initPage(account) {
    const deleteAccountButton = document.getElementById("delete-account-button");
    const logOutButton = document.getElementById("log-out-button");
    const changePasswordButton = document.getElementById("change-password-button");


    userAccount = account;
    loadTasks(userAccount);
    showTaskPage();
    personalButton.classList.remove("display-none");
    taskButton.addEventListener("click", hidePersonalAccount);
    personalButton.addEventListener("click", showPersonalAccount);
    avatarButton.addEventListener("click", changeAvatar);
    changePasswordButton.addEventListener("click", changePassword);
    logOutButton.addEventListener("click", logOut);
    deleteAccountButton.addEventListener("click", deleteAccount);
}
function showTaskPage() {
    taskPage.classList.remove("display-none");
}


function showPersonalAccount() {
    const usernameH1 = document.getElementById("username-h1");

    taskButton.classList.remove("display-none");
    personalAccount.classList.remove("display-none");
    taskPage.classList.add("display-none");
    personalButton.classList.add("display-none");
    footer.classList.add("display-none");
    if (userAccount.avatarUrl) {
        userAvatar.src = userAccount.avatarUrl;
    }
    usernameH1.textContent = userAccount.username;
    numberOfComplitedSpan.innerHTML = div(numberOfComplited, {}) + "Complited";
    tasksNowSpan.innerHTML = div(numberOfTasksNow, {}) + "Tasks now";
    numberOfTasksSpan.innerHTML = div(numberOfTasks, {}) + "All Tasks";
}
function hidePersonalAccount() {
    taskButton.classList.add("display-none");
    personalAccount.classList.add("display-none");
    taskPage.classList.remove("display-none");
    personalButton.classList.remove("display-none");
    footer.classList.remove("display-none");
}

function changeAvatar() {
    changeAvatarModal(userAccount);
}

export function updateAvatar(user) {
    userAccount = user;
    userAvatar.src = userAccount.avatarUrl;
    changeUser(user);
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
    numberOfTasksNow = 0;
}

function deleteAccount() {
    logOut();
    const users = JSON.parse(localStorage.getItem("users"));
    const index = users.findIndex(user => user.username === userAccount.username);
    users.splice(index, 1);
    saveUsers(users);
}
