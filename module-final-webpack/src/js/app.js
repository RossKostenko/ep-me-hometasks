import "./../scss/styles.scss";
import "./../scss/styles_main.scss";

import { DataConstructor } from "./classes/data-constructor";
import { initialData } from "./initial-data/index";
import { setTodoSorting, setDoneSorting } from "./render/set-sorting";
import { renderTodoList } from "./render/render-todo-list";
import { renderDoneList } from "./render/render-done-list";

(function setInitialData() {
  const checkIfEmpty = localStorage.getItem("listData");
  if (!checkIfEmpty) {
    localStorage.setItem("listData", JSON.stringify(initialData));
  }
})();

// #region setting data to variable from local sotrage
function getDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem("listData"));
}

const todoListData = new DataConstructor();

todoListData.subscribe(setSortingState);
todoListData.subscribe(setTodoTable);
todoListData.subscribe(setDoneTable);
todoListData.subscribe(addEventListeners);

todoListData.value = getDataFromLocalStorage();

// #endregion

function setSortingState() {
  setTodoSorting(todoListData.value);
  setDoneSorting(todoListData.value);
}

function setTodoTable() {
  const prevTodoTable = document.getElementById("todo-table-content");
  prevTodoTable.remove();
  renderTodoList(todoListData.value);
}

function setDoneTable() {
  const prevDoneTable = document.getElementById("done-table-content");
  prevDoneTable.remove();
  renderDoneList(todoListData.value);
}

function addEventListeners() {
  const deleteButtonArray = document.querySelectorAll(".delete");
  deleteButtonArray.forEach((el) => {
    el.addEventListener("click", removeRow);
  });
  const taskMessages = document.querySelectorAll(".message");
  taskMessages.forEach((el) => {
    el.addEventListener("click", editMessage);
  });
}

function removeRow() {
  const itemsArrayWithoutThisRow = todoListData.value.items.filter(
    (el) => el.id !== this.parentNode.parentNode.id
  );
  let newObj = { ...todoListData.value };
  newObj.items = itemsArrayWithoutThisRow;
  todoListData.value = newObj;
  refreshLocalStorage();
}

// #region editing text
function editMessage() {
  let value = this.innerText;
  this.innerText = "";
  const inputFieldInsideCell = this.appendChild(createInputField());
  inputFieldInsideCell.value = value;
  inputFieldInsideCell.focus();
}

function createInputField() {
  const inputField = document.createElement("input");
  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      toggleToText(inputField);
    }
  });
  return inputField;
}

function toggleToText(inputField) {
  const inputFieldValue = inputField.value;
  const itemId = inputField.parentNode.parentNode.id;

  const unchangeArr = todoListData.value.items.filter(
    (item) => item.id !== itemId
  );
  const changingItem = todoListData.value.items.filter(
    (item) => item.id === itemId
  )[0];
  changingItem.taskName = inputFieldValue;

  let newObj = { ...todoListData.value };
  newObj.items = [...unchangeArr, changingItem];
  todoListData.value = newObj;

  refreshLocalStorage();
}

// #endregion

function refreshLocalStorage() {
  localStorage.setItem("listData", JSON.stringify(todoListData.value));
}
