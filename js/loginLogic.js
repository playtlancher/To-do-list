import { account } from "./account.js";
import { initPage } from "./page.js";
const users = JSON.parse(localStorage.getItem('users')) || [];
const logSwitchBtn = document.getElementById("switch-login");
const regSwitchBtn = document.getElementById("switch-registration");
const logForm = document.getElementById("login-form");
const regForm = document.getElementById("registration-form");
const signUpBtnConteiner = document.getElementById("switch-sign-up-button-conteiner");
const loginBtnConteiner = document.getElementById("switch-login-button-conteiner");
const limiter = document.getElementById("limiter");



export function regestration() {
    const username = document.getElementById("reg-username");
    const password1 = document.getElementById("reg-password1");
    const password2 = document.getElementById("reg-password2");

    const userExists = users.some(user => user.username === username);
    if (userExists) {
        span.textContent = "Account with this username alredy exists";
        return;
    }
    if (password1.value === password2.value && username!=="" && password1 !=="") {
        const user = new account(username.value, password1.value);
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        limiter.classList.add("display-none");

        initPage(user);
        clearRegFields();
    }
}
export function login() {
    const username = document.getElementById("log-username");
    const password = document.getElementById("log-password");
    users.forEach(user => {
        if (user.username === username.value && user.password === password.value) {

            limiter.classList.add("display-none");
            initPage(user);

            clearLoginFields();
            return;
        }

    });

}
export function initRegLog() {
    const regBtn = document.getElementById("sign-up-button");
    const logBtn = document.getElementById("login-button");

    regBtn.addEventListener("click", regestration);
    logBtn.addEventListener("click", login);
    logSwitchBtn.addEventListener("click", showLogin);
    regSwitchBtn.addEventListener("click", showRegestration);
}
export function showLogin() {
    regForm.classList.add("display-none");
    loginBtnConteiner.classList.add("display-none");
    signUpBtnConteiner.classList.remove("display-none");
    logForm.classList.remove("display-none");
    clearRegFields();
}
function showRegestration() {
    regForm.classList.remove("display-none");
    loginBtnConteiner.classList.remove("display-none");
    signUpBtnConteiner.classList.add("display-none");
    logForm.classList.add("display-none");
    clearLoginFields();
}
function clearLoginFields() {
    const username = document.getElementById("log-username");
    const password = document.getElementById("log-password");
    username.value = "";
    password.value = "";
}
function clearRegFields() {
    let username = document.getElementById("reg-username");
    let password1 = document.getElementById("reg-password1");
    let password2 = document.getElementById("reg-password2");
    username.value = "";
    password1.value = "";
    password2.value = "";
}