import {saveTasks} from "./task.js";
let span;
let modal = document.getElementById("modal")
let input = document.getElementById("modal-input");

export function openModal(spanEl) {
    input.value = spanEl.textContent;
    span = spanEl;
    modal.style.display = "flex";
}

export function closeModal() {
    if (input.value !== span.textContent && input.value !== "") {
        span.textContent = input.value;
        saveTasks();
    }

    modal.style.display = "none";

}