"use strict";

const taskInput = document.getElementById("task_input");
const dateInput = document.getElementById("date_input");
const color = document.getElementById("color_pick");
const addBtn = document.getElementById("add_btn");

const toDoContainer = document.querySelector(".to_do");

const todos = [];
let date, priority, task;

const sortTodos = () => {
  todos.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
};

const columns = Array.from(document.querySelectorAll(".columns"));
columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("drop", dragDrop);
});
let dragItem = null;

function dragStart() {
  dragItem = this;
}

function dragEnd() {
  //   this.className = "to_do_container";
  dragItem = null;
}

function dragDrop() {
  this.append(dragItem);
  console.log(this);
  console.log(this.children);
}

function dragOver(e) {
  e.preventDefault();
}
const insertTaskContainer = (dueDate, colorPriority, todoTask) => {
  const newTaskContainer = document.createElement("div");
  newTaskContainer.classList.add("to_do_container");
  toDoContainer.append(newTaskContainer);
  newTaskContainer.setAttribute("draggable", "true");
  if (colorPriority === "high") {
    newTaskContainer.style.borderTop = "1rem solid #ff65a3";
  } else if (colorPriority === "med") {
    newTaskContainer.style.borderTop = "1rem solid #fff740";
  } else if (colorPriority === "soso") {
    newTaskContainer.style.borderTop = "1rem solid #7afcff";
  }
  priority = colorPriority;
  newTaskContainer.addEventListener("dragstart", dragStart);
  newTaskContainer.addEventListener("dragend", dragEnd);

  const newTaskInput = document.createElement("p");
  newTaskInput.setAttribute("contenteditable", "true");
  newTaskContainer.append(newTaskInput);
  newTaskInput.innerText = todoTask;
  task = newTaskInput.innerText;

  const newTaskFooter = document.createElement("div");
  newTaskFooter.classList.add("task_foot");
  newTaskContainer.append(newTaskFooter);

  const dateSelected = document.createElement("p");
  dateSelected.classList.add("date");
  newTaskFooter.append(dateSelected);
  date = dueDate;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (today.toLocaleDateString() === new Date(dueDate).toLocaleDateString()) {
    dateSelected.innerText = "today";
  } else if (
    tomorrow.toLocaleDateString() === new Date(dueDate).toLocaleDateString()
  ) {
    dateSelected.innerText = "tomorrow";
  } else {
    dateSelected.innerText = dueDate;
  }

  const deleteTask = () => {
    const index = todos.findIndex((obj) => obj.task === todoTask);
    todos.splice(index, 1);
    newTaskContainer.remove();
    localStorage.setItem("todo_list", JSON.stringify(todos));
  };

  const deleteBtn = document.createElement("p");
  deleteBtn.classList.add("delete_btn");
  newTaskFooter.append(deleteBtn);
  deleteBtn.innerText = "🗑️❌";
  deleteBtn.addEventListener("click", deleteTask);
};
const addTask = addBtn.addEventListener("click", () => {
  insertTaskContainer(dateInput.value, color.value, taskInput.value);
  todos.push({ date, priority, task });
  sortTodos();
  setItems();
  taskInput.value = "";
  dateInput.value = "";
  color.value = "";
  location.reload();
});

const setItems = () => {
  window.localStorage.setItem("todo_list", JSON.stringify(todos));
};

const loadTasks = () => {
  let tasks = Array.from(
    JSON.parse(window.localStorage.getItem("todo_list")) || []
  );
  todos.push(...tasks);

  todos.map((item) => {
    insertTaskContainer(item.date, item.priority, item.task);
  });

  sortTodos();
};
console.log(todos);

window.onload = loadTasks();
// localStorage.clear();
