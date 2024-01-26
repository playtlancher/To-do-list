import { loadTasks } from "./task.js";
import { loadTheme } from "./theme.js";

const personalButton = document.getElementById("personal-account-button");
const taskButton = document.getElementById("task-button");
const personalAccount = document.getElementById("personal-account");
const taskPage = document.getElementById("task-page");
let span = document.getElementById("reg-log-span");


export function initPage(account) {
    loadTheme(account);
    loadTasks(account);
    showTaskPage();
    initPersonalAccount(account);
    personalButton.classList.remove("display-none");
    taskButton.addEventListener("click",hidePersonalAccount);
    personalButton.addEventListener("click",showPersonalAccount);
}
function showTaskPage() {
    const taskPage = document.getElementById("task-page");
    taskPage.classList.remove("display-none");
}

function initPersonalAccount(account){
    const nothing = document.getElementById("nothing");
    const welcome = document.getElementById("welcome");
    nothing.textContent = "There's nothing here yet";
    welcome.textContent = `Welcome , ${account.username}`;
}
function showPersonalAccount(){
    taskButton.classList.remove("display-none");
    personalAccount.classList.remove("display-none");
    span.classList.add("display-none");
    taskPage.classList.add("display-none");
    personalButton.classList.add("display-none");
}
function hidePersonalAccount(){
    taskButton.classList.add("display-none");
    personalAccount.classList.add("display-none");
    span.classList.remove("display-none");
    taskPage.classList.remove("display-none");
    personalButton.classList.remove("display-none");

}



