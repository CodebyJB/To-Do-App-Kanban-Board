"use strict";

const taskInput = document.getElementById("task_input");
const dateInput = document.getElementById("date_input");
const color = document.getElementById("color_pick");
const addBtn = document.getElementById("add_btn");

const toDoContainer = document.querySelector(".to_do");

const insertTaskContainer = (titi) => {
  const deleteTask = () => {
    newTaskContainer.remove();
  };

  const newTaskContainer = document.createElement("div");
  newTaskContainer.classList.add("to_do_container");
  toDoContainer.append(newTaskContainer);
  if (color.value === "high") {
    newTaskContainer.style.borderTop = "1rem solid #ff65a3";
  } else if (color.value === "med") {
    newTaskContainer.style.borderTop = "1rem solid #fff740";
  } else if (color.value === "soso") {
    newTaskContainer.style.borderTop = "1rem solid #7afcff";
  }
  todo.priority = color.value;

  const newTaskInput = document.createElement("p");
  newTaskInput.setAttribute("contenteditable", "true");
  newTaskContainer.append(newTaskInput);
  //   newTaskInput.innerText = taskInput.value;
  newTaskInput.innerText = titi;
  todo.task = newTaskInput.innerText;

  const newTaskFooter = document.createElement("div");
  newTaskFooter.classList.add("task_foot");
  newTaskContainer.append(newTaskFooter);

  const dateSelected = document.createElement("p");
  dateSelected.classList.add("date");
  newTaskFooter.append(dateSelected);
  todo.date = dateInput.value;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (
    today.toLocaleDateString() ===
    new Date(dateInput.value).toLocaleDateString()
  ) {
    dateSelected.innerText = "today";
  } else if (
    tomorrow.toLocaleDateString() ===
    new Date(dateInput.value).toLocaleDateString()
  ) {
    dateSelected.innerText = "tomorrow";
  } else {
    dateSelected.innerText = dateInput.value;
  }

  const deleteBtn = document.createElement("p");
  deleteBtn.classList.add("delete_btn");
  newTaskFooter.append(deleteBtn);
  deleteBtn.innerText = "🗑️❌";
  deleteBtn.addEventListener("click", deleteTask);
};

const addTask = addBtn.addEventListener("click", () => {
  insertTaskContainer(taskInput.value);
  todos.push(todo);
  //   localStorage.setItem("task", todo);
  setItems();
  taskInput.value = "";
  dateInput.value = "";
  color.value = "";
});

const todos = [];
console.log(todos);
const todo = {};
console.log(todo);

// const getItems = () => {
//   const value = localStorage.getItem("todo-test") || [];
//   return JSON.parse(value);
// };

// let items = getItems();

const setItems = () => {
  const itemsJson = JSON.stringify(todos);
  localStorage.setItem("todo-test", itemsJson);
};

// On app load, get all tasks from localStorage

const loadTasks = () => {
  const value = localStorage.getItem("todo-test") || [];
  // Get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("todo-test")));
  console.log(tasks);
  insertTaskContainer(taskInput.value);
};

window.onload = loadTasks();
