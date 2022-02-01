import "./../scss/styles.scss";

import { DataConstructor } from "./classes/data-constructor";
import { initialData } from "./initial-data/index";
import { setTodoSorting, setDoneSorting } from "./render/set-sorting";
import { renderTodoList } from "./render/render-todo-list";
import { renderDoneList } from "./render/render-done-list";
import { Task } from "./classes/task";

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

  const checkboxes = document.querySelectorAll(".checkbox-input");
  checkboxes.forEach((el) => {
    el.addEventListener("click", moveToOtherList);
  });

  const addTaskButton = document.getElementById("add-task-button");
  addTaskButton.addEventListener("click", addNewTask);

  const addTaskInput = document.getElementById("todo-add-input");
  addTaskInput.addEventListener("keydown", addNewTaskViaInput);

  const todoSortingSelect = document.getElementById("todo-sorting");
  todoSortingSelect.addEventListener("change", sortTodo);

  const doneSortingSelect = document.getElementById("done-sorting");
  doneSortingSelect.addEventListener("change", sortDone);

  const removeTableButton = document.querySelectorAll(".remove-table-button");
  removeTableButton.forEach((el) => {
    el.addEventListener("click", removeList);
  });

  const row = document.querySelectorAll(".table-row");
  row.forEach((el) => {
    el.addEventListener("mouseenter", showDeleteButton);
    el.addEventListener("mouseleave", hideDeleteButton);
  });

  const search = document.getElementById("todo-search");
  search.addEventListener("focus", sortArray);
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

function moveToOtherList() {
  const itemId = this.parentNode.parentNode.id;
  const unchangeArr = todoListData.value.items.filter(
    (item) => item.id !== itemId
  );
  const changingItem = todoListData.value.items.filter(
    (item) => item.id === itemId
  )[0];
  changingItem.done = this.checked;

  let newObj = { ...todoListData.value };
  newObj.items = [...unchangeArr, changingItem];
  todoListData.value = newObj;

  refreshLocalStorage();
}

function addNewTask() {
  const input = document.getElementById("todo-add-input");
  const time = Date.now();

  if (input.value) {
    const newTask = new Task(input.value, time);

    let newObj = { ...todoListData.value };
    newObj.items = [...todoListData.value.items, newTask];
    todoListData.value = newObj;
    input.value = "";

    refreshLocalStorage();
  }
}

function addNewTaskViaInput(event) {
  if (event.key === "Enter") {
    addNewTask();
  }
}

function sortTodo() {
  console.log(this.value);
  const newObj = { ...todoListData.value };

  newObj.sortingTodo = this.value;
  todoListData.value = newObj;

  refreshLocalStorage();
}

function sortDone() {
  console.log(this.value);
  const newObj = { ...todoListData.value };

  newObj.sortingDone = this.value;
  todoListData.value = newObj;

  refreshLocalStorage();
}

function removeList() {
  const table = this.parentNode.parentNode;
  const taskIds = [];
  table.querySelectorAll(".table-row").forEach((el) => {
    taskIds.push(el.id);
  });

  const newArr = todoListData.value.items.filter(
    (item) => taskIds.indexOf(item.id) === -1
  );

  const newObj = { ...todoListData.value };

  newObj.items = newArr;

  todoListData.value = newObj;
  refreshLocalStorage();
}

function showDeleteButton() {
  const deleteButton = this.querySelector(".delete");
  deleteButton.style.display = "block";
}

function hideDeleteButton() {
  const deleteButton = this.querySelector(".delete");
  deleteButton.style.display = "none";
}

function sortArray() {
  const prevtodoListData = { ...todoListData.value };
  const listArray = [...todoListData.value.items];
  const search = this;
  search.addEventListener("keydown", resetTable);
  search.addEventListener("change", sortArrayOnEveryKeystroke);

  function resetTable(event) {
    if (event.key === "Escape") {
      todoListData.value = prevtodoListData;
    }
  }

  function sortArrayOnEveryKeystroke() {
    if (search.value) {
      const searchedArray = listArray.filter((el) =>
        el.taskName.match(search.value)
      );

      const newObj = { ...todoListData.value };
      newObj.items = searchedArray;
      todoListData.value = newObj;
    } else {
      todoListData.value = prevtodoListData;
    }
  }
}

function refreshLocalStorage() {
  localStorage.setItem("listData", JSON.stringify(todoListData.value));
}
