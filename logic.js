"use strict";

const taskInput = document.getElementById("task_input");
const dateInput = document.getElementById("date_input");
const color = document.getElementById("color_pick");
const addBtn = document.getElementById("add_btn");

const toDoContainer = document.querySelector(".to_do");

const insertTaskContainer = () => {
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

  const newTaskInput = document.createElement("p");
  newTaskInput.setAttribute("contenteditable", "true");
  newTaskContainer.append(newTaskInput);
  newTaskInput.innerText = taskInput.value;

  const newTaskFooter = document.createElement("div");
  newTaskFooter.classList.add("task_foot");
  newTaskContainer.append(newTaskFooter);

  const dateSelected = document.createElement("p");
  dateSelected.classList.add("date");
  newTaskFooter.append(dateSelected);
  dateSelected.innerText = dateInput.value;

  const deleteBtn = document.createElement("p");
  deleteBtn.classList.add("delete_btn");
  newTaskFooter.append(deleteBtn);
  deleteBtn.innerText = "🗑️❌";
};

const addTask = addBtn.addEventListener("click", () => {
  insertTaskContainer();
});
