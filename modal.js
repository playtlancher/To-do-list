import {saveTasks} from "./task.js";

let header;
let description;
let inputHeader;
let inputDescription;
let selector;
let timer;
let modal = document.getElementById("modal")

export function openEditModal(item) {
    clearModal();

    let headerEl = item.getElementsByClassName("header")[0];

    let descriptionEl = item.getElementsByClassName("description")[0];


    let modalSpan = document.createElement("span");
    inputHeader = document.createElement("input");
    inputDescription = document.createElement("input");
    let button = document.createElement("button");

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
    if (inputHeader.value !== header.textContent && inputHeader.value !== "" && inputDescription !== inputDescription) {
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

    let itemHeader = item.getElementsByClassName("header")[0];
    let itemDescription = item.getElementsByClassName("description")[0];
    let itemDate = item.getElementsByClassName("date")[0].textContent;
    let itemStatus = item.getElementsByClassName("status")[0]


    let header = document.createElement("span");
    let description = document.createElement("span");
    let recordDate = document.createElement("span");
    let deadline = document.createElement("span");
    let timeToDeadline = document.createElement("span");

    let closeButton = document.createElement("button");

    closeButton.textContent = "close";
    closeButton.classList.add("margin-left");
    closeButton.addEventListener("click", function () {
            hideModal();
            modal.classList.remove("modal-info")
        }
    );

    let dates = itemDate.split(":");


    header.textContent = "Header: " + itemHeader.textContent;
    description.textContent = "Description: " + itemDescription.textContent;
    recordDate.textContent = "Record date: " + dates[0];
    deadline.textContent = "Deadline date: " + dates[1];

    selector = document.createElement("select");
    let completed = document.createElement("option");
    let inProgress = document.createElement("option");
    let scheduled = document.createElement("option");

    completed.textContent = "Completed";
    inProgress.textContent = "In progress";
    scheduled.textContent = "Scheduled";
    selector.appendChild(scheduled)
    selector.appendChild(inProgress)
    selector.appendChild(completed)
    selector.value = itemStatus.textContent;
    console.log(itemStatus.textContent);
    selector.addEventListener("change", function () {
        let checkbox = item.getElementsByTagName("input")[0];
        itemStatus.textContent = selector.value;
        if (selector.value === "Completed") {
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

    modal.appendChild(closeButton);
    modal.appendChild(header);
    modal.appendChild(description);
    modal.appendChild(recordDate);
    modal.appendChild(deadline);
    modal.appendChild(timeToDeadline);
    modal.appendChild(selector);

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
        selector.style.display = "none"
        saveTasks();
    } else {
        span.textContent = "Time to deadline: " + time.days + " days " + time.hours + " hours " + time.minutes + " minutes " + time.seconds + " seconds ";
    }
}
