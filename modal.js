import { saveTasks } from "./task.js";
import { createEl, createHTML } from "./utils.js";

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

    let html = createHTML("Enter text", { tag: "span", });
    html += createHTML(headerEl.textContent, { tag: "input", id: "modal-header-input" });
    html += createHTML(descriptionEl.textContent, { tag: "input", id: "modal-description-input" });
    html += createHTML("OK", { tag: "button", id: "modal-btn" });
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


    let html = createHTML("close", { tag: "button", classes: ["margin-left close"] });
    html += createHTML(`Header: ${itemHeader.textContent}`, { tag: "span", classes: ["modal-info-items header"] });
    html += createHTML(`Description: ${itemDescription.textContent}`, { tag: "span", classes: ["modal-info-items description"] });
    html += createHTML(`Record date: ${dates[0]}`, { tag: "span", classes: ["modal-info-items record-date"] });
    html += createHTML(`Deadline date: ${dates[1]}`, { tag: "span", classes: ["modal-info-items deadline"] });
    html += createHTML("", { tag: "span", classes: ["modal-info-items timeToDeadline"] });
    modal.innerHTML = html;

    let header = modal.querySelector(".header");
    let timeToDeadline = modal.querySelector(".timeToDeadline");
    let closeButton = modal.querySelector(".close");


    closeButton.addEventListener("click", function () {
        hideModal();
        modal.classList.remove("modal-info")
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
    modal.style.display = "none";
    clearModal();
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