import { account } from "./account.js";
import { initPage } from "./page.js";
const users = JSON.parse(localStorage.getItem('users')) || [];
let span = document.getElementById("reg-log-span");
let logSwitchBtn = document.getElementById("switch-login");
let regSwitchBtn = document.getElementById("switch-registration");
let logForm = document.getElementById("login-form");
let regForm = document.getElementById("registration-form");


export function regestration() {
    let username = document.getElementById("reg-username");
    let password1 = document.getElementById("reg-password1");
    let password2 = document.getElementById("reg-password2");

    const userExists = users.some(user => user.username === username);
    if (userExists) {
        span.textContent = "Account with this username alredy exists";
        return;
    }

    if (password1.value === password2.value) {
        const user = new account(username.value, password1.value);
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        span.textContent = `Welcome , ${username.value}`;
        regForm.classList.add("display-none");
        logSwitchBtn.classList.add("display-none");
        initPage(user);
    }
}
export function login() {
    const username = document.getElementById("log-username");
    const password = document.getElementById("log-password");

    users.forEach(user => {
        if (user.username === username.value && user.password === password.value) {
            logForm.classList.add("display-none");
            regSwitchBtn.classList.add("display-none");
            span.textContent = `Welcome , ${username.value}`;
            initPage(user);
            return;
        }

    });
    if (span.textContent !== `Welcome , ${username.value}`)
        span.textContent = "Invalid username or password"
}
export function initRegLog() {
    const regBtn = document.getElementById("reg-button");
    const logBtn = document.getElementById("log-button");

    regBtn.addEventListener("click", regestration);
    logBtn.addEventListener("click", login);

    logSwitchBtn.addEventListener("click", showLogin);
    regSwitchBtn.addEventListener("click", showRegestration);
}
function showLogin() {
    regForm.classList.add("display-none");
    logSwitchBtn.classList.add("display-none");
    regSwitchBtn.classList.remove("display-none");
    logForm.classList.remove("display-none");
}
function showRegestration() {
    regForm.classList.remove("display-none");
    logSwitchBtn.classList.remove("display-none");
    regSwitchBtn.classList.add("display-none");
    logForm.classList.add("display-none");
}