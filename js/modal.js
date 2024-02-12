import { updateAvatar } from "./page.js";
import { changeUser, saveTasks } from "./task.js";
import { createEl, createHTML, div } from "./utils.js";

let headerEl;
let descriptionEl;
let inputHeader;
let inputDescription;
let statusSelector;
let timer;
const modal = document.getElementById("modal")

export function openEditModal(item) {
    clearModal();

    headerEl = item.querySelector(".header");
    descriptionEl = item.querySelector(".description");


    let inputHtml = createHTML(headerEl.textContent, { tag: "input", id: "modal-header-input", classes: ["input100"] });
    inputHtml += `<span class="focus-input100"></span>`;
    let html = div(inputHtml, { classes: ["wrap-input100"] });
    inputHtml = createHTML(descriptionEl.textContent, { tag: "input", id: "modal-description-input", classes: ["input100"] });
    inputHtml += `<span class="focus-input100"></span>`;
    html += div(inputHtml, { classes: ["wrap-input100"] });
    inputHtml = div("", { classes: ["login100-form-bgbtn"] });
    inputHtml += createHTML("OK", { tag: "button", classes: "login100-form-btn" })
    html += div(div(inputHtml, { classes: ["wrap-login100-form-btn"] }), { classes: ["container-wrap-login100-form-btn"] })

    modal.innerHTML = html;

    let button = modal.querySelector("button");
    inputHeader = modal.querySelector("#modal-header-input");
    inputDescription = modal.querySelector("#modal-description-input");

    button.addEventListener("click", hideEditModal);

    inputHeader.value = headerEl.textContent;
    inputDescription.value = descriptionEl.textContent;
    modal.style.display = "flex";
}

function hideEditModal() {
    if (inputHeader.value !== "" && inputDescription !== "") {
        headerEl.textContent = inputHeader.value;
        descriptionEl.textContent = inputDescription.value;
        saveTasks();
    }

    hideModal();
}


export function openInfoModal(item) {
    clearModal();
    modal.style.display = "flex";
    modal.classList.add("modal-info");

    let itemHeader = item.querySelector(".header");
    let itemDescription = item.querySelector(".description");
    let itemDate = item.querySelector(".date").textContent;
    let itemStatus = item.querySelector(".status");

    let dates = itemDate.split(":");


    let html = createHTML("close", { tag: "button", id: "modal-close-button", classes: ["margin-left fs-20"] });
    html += createHTML(`Header: ${itemHeader.textContent}`, { tag: "span", classes: ["modal-items header"] });
    html += createHTML(`Description: ${itemDescription.textContent}`, { tag: "span", classes: ["modal-items description"] });
    html += createHTML(`Record date: ${dates[0]}`, { tag: "span", classes: ["modal-items record-date"] });
    html += createHTML(`Deadline date: ${dates[1]}`, { tag: "span", classes: ["modal-items deadline"] });
    html += createHTML("", { tag: "span", classes: ["modal-items timeToDeadline"] });
    modal.innerHTML = html;

    let header = modal.querySelector(".header");
    let timeToDeadline = modal.querySelector(".timeToDeadline");
    let closeButton = modal.querySelector("#modal-close-button");


    closeButton.addEventListener("click", function () {
        hideModal();
        modal.classList.remove("modal-info");
    }
    );


    statusSelector = createEl("select");

    let selectorHTML = createHTML("Completed", { tag: "option" })
    selectorHTML += createHTML("In progress", { tag: "option" });
    selectorHTML += createHTML("Scheduled", { tag: "option" })
    statusSelector.innerHTML = selectorHTML;

    statusSelector.value = itemStatus.textContent;

    statusSelector.addEventListener("change", function () {
        let checkbox = item.querySelector("input");
        itemStatus.textContent = statusSelector.value;
        if (statusSelector.value === "Completed") {
            checkbox.checked = true;
            header.classList.add("strikethrough-animation");
        } else {
            checkbox.checked = false;
            itemHeader.style.transform = "rotateX(0deg)";
            header.classList.remove("strikethrough-animation");
        }
        saveTasks();
    });

    showTimeRemaining(timeToDeadline, dates[1]);

    timer = setInterval(function () {
        showTimeRemaining(timeToDeadline, dates[1]);
    }, 1000);

}

function hideModal() {
    modal.classList.add("fade-out");
    setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("fade-out");
        clearModal();
    }, 450);
}

function clearModal() {
    clearInterval(timer);
    modal.innerHTML = "";
    saveTasks();

}

function getTimeRemaining(deadline) {
    const now = new Date();
    const timeRemaining = Date.parse(deadline) - now;
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    return {
        total: timeRemaining,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

function showTimeRemaining(span, deadline) {
    const time = getTimeRemaining(deadline);
    if (time.total < 0) {
        span.textContent = "Status: Overdue";
        statusSelector.style.display = "none"
        saveTasks();
    } else {
        span.textContent = "Time to deadline: " + time.days + " days " + time.hours + " hours " + time.minutes + " minutes " + time.seconds + " seconds ";
    }
}
export function changePasswordModal(userAccount) {

    modal.style.display = "flex";

    let html = createHTML("close", { tag: "button", id: "modal-close-button", classes: ["margin-left"] });
    let inputHtml = createHTML("", { tag: "input", id: "new-password-one", classes: ["input100"] });
    inputHtml += `<span class="focus-input100"></span>`;
    html += div(inputHtml, { classes: ["wrap-input100"] });
    inputHtml = createHTML("", { tag: "input", id: "new-password-two", classes: ["input100"] });
    inputHtml += `<span class="focus-input100"></span>`;
    html += div(inputHtml, { classes: ["wrap-input100"] });
    html += createHTML("OK", { tag: "button", id: "change-password-modal-button" });
    html += createHTML("", { tag: "span", id: "password-span" })
    modal.innerHTML = html;
    const closeButton = document.getElementById("modal-close-button");
    const changeButton = document.getElementById("change-password-modal-button");
    closeButton.addEventListener("click", function () {
        hideModal();
    });
    changeButton.addEventListener("click", function () {
        const password1 = document.getElementById("new-password-one");
        const password2 = document.getElementById("new-password-two");
        if (password1.value === password2.value) {
            userAccount.password = password1.value;

            changeUser(userAccount);

            hideModal();
        } else {
            const passwordSpan = document.getElementById("password-span");
            passwordSpan.textContent = "You've entered different passwords in the fields";
        }
    });
}
export function changeAvatarModal(user) {
    modal.style.display = "flex";

    let html = createHTML("close", { tag: "button", id: "modal-close-button", classes: ["margin-left"] });
    let inputHtml = createHTML("", { tag: "input", id: "avatar-input", placeHolder: "Picture url", classes: ["input100"] });
    inputHtml += `<span class="focus-input100"></span>`;
    html += div(inputHtml, { classes: ["wrap-input100"] });
    html += createHTML("OK", { tag: "button", id: "change-avatar-modal-button" });

    modal.innerHTML = html;
    const closeButton = document.getElementById("modal-close-button");
    closeButton.addEventListener("click", function () {
        hideModal();
    });
    const changeButton = document.getElementById("change-avatar-modal-button");
    changeButton.addEventListener("click", function () {
        const avatarInput = document.getElementById("avatar-input");

        if (avatarInput.value !== "") {
            user.avatarUrl = avatarInput.value;
            updateAvatar(user);
        }
        hideModal();
    });
}