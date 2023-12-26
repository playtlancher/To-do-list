function saveTasks(){

}


function addTaskByButton() {
    let taskText = document.getElementById("task-input");
    addTask(taskText.value);
    taskText.value = "";

}

function addTask(taskText) {
    let taskList = document.getElementById("task-list");

    let taskItem = document.createElement("li");
    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskItem.appendChild(taskSpan);

    let removeButton = document.createElement("Button");
    removeButton.textContent = "remove";
    removeButton.addEventListener("click", function () {
        taskList.remove(taskItem);
    })
    let editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.addEventListener("click", function () {
        let newText = prompt("Enter new text", taskText);
        if (newText !== null) {
            taskSpan.textContent = newText;
        }
    })

    taskItem.appendChild(editButton);
    taskItem.appendChild(removeButton);

    taskList.appendChild(taskItem);

}
document.getElementById("add-button").addEventListener("click",addTaskByButton);