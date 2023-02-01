"use strict";

const taskInput = document.getElementById("task_input");
const dateInput = document.getElementById("date_input");
const color = document.getElementById("color_pick");
const addBtn = document.getElementById("add_btn");

const toDoContainer = document.getElementById("to_do");

let tasks = [];

const sortTasks = () => {
  tasks.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
};

const addTask = () => {
  const task = {
    id: Date.now(),
    task: taskInput.value,
    date: dateInput.value,
    priority: color.value,
  };
  tasks.push(task);
  sortTasks();
  location.reload();
  renderTask(task);
  taskInput.value = "";
  dateInput.value = "";
  color.value = "";
};

addBtn.addEventListener("click", addTask);

let isTouchDevice = "ontouchstart" in document.documentElement;
let events = isTouchDevice
  ? ["touchstart", "touchmove", "touchend"]
  : ["mousedown", "mousemove", "mouseup"];

const columns = Array.from(document.querySelectorAll(".columns"));
columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("drop", dragDrop);
});
// let dragItem = null;
let dragItem;

function dragStart(e) {
  dragItem = this;
}

function dragEnd(e) {
  dragItem = null;
}

function dragDrop(e) {
  this.append(dragItem);
  const containerId = dragItem.getAttribute("data-id");
  const container = tasks.find((item) => {
    return item.id === +containerId;
  });
  container.container = this.id;
}

function dragOver(e) {
  e.preventDefault();
}

const renderTask = (task) => {
  const newTaskContainer = document.createElement("div");
  newTaskContainer.classList.add("to_do_container");
  toDoContainer.append(newTaskContainer);
  newTaskContainer.setAttribute("draggable", "true");
  newTaskContainer.setAttribute("data-id", task.id);

  if (task.container === "to-do") {
    document.getElementById("to_do").appendChild(newTaskContainer);
  } else if (task.container === "in_progress") {
    document.getElementById("in_progress").appendChild(newTaskContainer);
  } else if (task.container === "backlog") {
    document.getElementById("backlog").appendChild(newTaskContainer);
  } else if (task.container === "done") {
    document.getElementById("done").appendChild(newTaskContainer);
  }

  if (task.priority === "high") {
    newTaskContainer.style.borderTop = "1rem solid #ff65a3";
  } else if (task.priority === "med") {
    newTaskContainer.style.borderTop = "1rem solid #fff740";
  } else if (task.priority === "low") {
    newTaskContainer.style.borderTop = "1rem solid #7afcff";
  }

  newTaskContainer.addEventListener(events[0], dragStart);
  newTaskContainer.addEventListener(events[1], dragOver);
  newTaskContainer.addEventListener(events[2], dragDrop);

  const newTaskInput = document.createElement("p");
  newTaskInput.setAttribute("contenteditable", "true");
  newTaskContainer.append(newTaskInput);
  newTaskInput.innerText = task.task;

  const newTaskFooter = document.createElement("div");
  newTaskFooter.classList.add("task_foot");
  newTaskContainer.append(newTaskFooter);

  const dateSelected = document.createElement("p");
  dateSelected.classList.add("date");
  newTaskFooter.append(dateSelected);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (today.toLocaleDateString() === new Date(task.date).toLocaleDateString()) {
    dateSelected.innerText = "today";
  } else if (
    tomorrow.toLocaleDateString() === new Date(task.date).toLocaleDateString()
  ) {
    dateSelected.innerText = "tomorrow";
  } else {
    dateSelected.innerText = task.date;
  }

  const deleteTask = () => {
    const clicked = task.id;
    const index = tasks.findIndex((obj) => obj.id === clicked);
    tasks.splice(index, 1);
    newTaskContainer.remove();
  };

  const deleteBtn = document.createElement("p");
  deleteBtn.classList.add("delete_btn");
  newTaskFooter.append(deleteBtn);
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteTask);
};

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = () => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach(renderTask);
  }
};

window.addEventListener("load", loadTasks);
window.addEventListener("beforeunload", saveTasks);
