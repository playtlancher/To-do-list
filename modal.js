import {saveTasks} from "./task.js";
import {createEl} from "./utils.js";

let header;
let description;
let inputHeader;
let inputDescription;
let statusSelector;
let timer;
const modal = document.getElementById("modal")

export function openEditModal(item) {
    clearModal();

    let headerEl = item.getElementsByClassName("header")[0];

    let descriptionEl = item.getElementsByClassName("description")[0];


    let modalSpan = createEl("span");
    inputHeader = createEl("input");
    inputDescription = createEl("input");
    let button = createEl("button");

    inputDescription.id = "modal-input";
    button.id = "modal-btn";

    modalSpan.textContent = "Enter text";
    button.textContent = "OK";

    button.addEventListener("click", hideEditModal);


    modal.appendChild(modalSpan);
    modal.appendChild(inputHeader);
    modal.appendChild(inputDescription);
    modal.appendChild(button);

    inputHeader.value = headerEl.textContent;
    inputDescription.value = descriptionEl.textContent;
    console.log(descriptionEl.textContent);
    header = headerEl;
    description = descriptionEl;
    modal.style.display = "flex";
}

function hideEditModal() {
    if (inputHeader.value !== "" && inputHeader.value !== "" && inputDescription !== "") {
        header.textContent = inputHeader.value;
        description.textContent = inputDescription.value;
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


    let header = createEl("span");
    let description = createEl("span");
    let recordDate = createEl("span");
    let deadline = createEl("span");
    let timeToDeadline = createEl("span");

    let closeButton = createEl("button");

    closeButton.textContent = "close";
    closeButton.classList.add("margin-left");

    closeButton.addEventListener("click", function () {
            hideModal();
            modal.classList.remove("modal-info")
        }
    );

    let dates = itemDate.split(":");


    header.textContent = `Header: ${itemHeader.textContent}`;
    description.textContent = `Description: ${itemDescription.textContent}`;
    recordDate.textContent = `Record date: ${dates[0]}`;
    deadline.textContent = `Deadline date: ${dates[1]}`;


    statusSelector = createEl("select");
    let completed = createEl("option");
    let inProgress = createEl("option");
    let scheduled = createEl("option");

    completed.textContent = "Completed";
    inProgress.textContent = "In progress";
    scheduled.textContent = "Scheduled";


    statusSelector.appendChild(scheduled);
    statusSelector.appendChild(inProgress);
    statusSelector.appendChild(completed);

    statusSelector.value = itemStatus.textContent;

    statusSelector.addEventListener("change", function () {
        let checkbox = item.querySelector("input");
        itemStatus.textContent = statusSelector.value;
        if (statusSelector.value === "Completed") {
            checkbox.checked = true;
            itemHeader.style.transform = "rotateX(360deg)";
            itemHeader.style.textDecoration = "line-through";
        } else {
            checkbox.checked = false;
            itemHeader.style.transform = "rotateX(0deg)";
            itemHeader.style.textDecoration = "none";
        }
        saveTasks();
    })
    header.classList.add("modal-info-items");
    description.classList.add("modal-info-items");
    recordDate.classList.add("modal-info-items");
    deadline.classList.add("modal-info-items");
    timeToDeadline.classList.add("modal-info-items");


    modal.appendChild(closeButton);
    modal.appendChild(header);
    modal.appendChild(description);
    modal.appendChild(recordDate);
    modal.appendChild(deadline);
    modal.appendChild(timeToDeadline);
    modal.appendChild(statusSelector);

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