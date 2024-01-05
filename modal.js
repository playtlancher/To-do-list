import {saveTasks} from "./task.js";

let span;
let input;
let timer;
let modal = document.getElementById("modal")

export function openEditModal(spanEl) {
    clearModal();

    let modalSpan = document.createElement("span");
    input = document.createElement("input");
    let button = document.createElement("button");

    input.id = "modal-input";
    button.id = "modal-btn";

    modalSpan.textContent = "Enter text";
    button.textContent = "OK";

    button.addEventListener("click", hideEditModal);

    modal.appendChild(modalSpan);
    modal.appendChild(input);
    modal.appendChild(button);

    input.value = spanEl.textContent;
    span = spanEl;
    modal.style.display = "flex";
}

function hideEditModal() {
    if (input.value !== span.textContent && input.value !== "") {
        span.textContent = input.value;
        saveTasks();
    }

    hideModal();
}


export function openInfoModal(item) {
    clearModal();
    modal.style.display = "flex";
    modal.classList.add("modal-info");

    let itemHeader = item.getElementsByClassName("task");
    let itemDescription = item.getElementsByClassName("description");
    let itemDate = item.getElementsByClassName("date")[0].textContent;


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


    header.textContent = "Header: " + itemHeader[0].textContent;
    description.textContent = "Description: " + itemDescription[0].textContent;
    recordDate.textContent = "Record date: " + dates[0];
    deadline.textContent = "Deadline date: " + dates[1];

    modal.appendChild(closeButton);
    modal.appendChild(header);
    modal.appendChild(description);
    modal.appendChild(recordDate);
    modal.appendChild(deadline);
    modal.appendChild(timeToDeadline);

    showTimeRemaining(timeToDeadline, dates[1]);

    timer = setInterval(function() {
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

function showTimeRemaining(span,deadline) {
    const time = getTimeRemaining(deadline);
    span.textContent = "Time to deadline: " + time.days + " days " + time.hours + " hours " + time.minutes + " minutes " + time.seconds + " seconds ";

}



