import {saveTasks} from "./task.js";

let span;
let input;
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

    let itemHeader = item.getElementsByTagName("span");
    let itemDescription = item.getElementsByTagName("p");


    let header = document.createElement("span");
    let description = document.createElement("span");

    let closeButton = document.createElement("button");

    closeButton.textContent = "close";
    closeButton.classList.add("margin-left");
    closeButton.addEventListener("click", function () {
            hideModal();
            modal.classList.remove("modal-info")
        }
    );

    header.textContent = "Header: " + itemHeader[0].textContent;
    description.textContent = "Description: " + itemDescription[0].textContent;

    modal.appendChild(closeButton);
    modal.appendChild(header);
    modal.appendChild(description);
}

function hideModal() {
    modal.style.display = "none";
    clearModal();
}

function clearModal() {
    modal.innerHTML = "";

}