const mainTable = document.getElementById("tbody");

function addDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "delete";
  deleteButton.addEventListener("click", deleteRow);
  return deleteButton;
}

function addToggleToInput(cell) {
  cell.addEventListener("dblclick", toggleToInput);
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

function toggleToInput() {
  const value = this.innerText;
  this.innerText = "";
  const inputFieldInsideCell = this.appendChild(createInputField());
  inputFieldInsideCell.value = value;
  inputFieldInsideCell.focus();
}

function toggleToText(inputNode) {
  inputNode.parentNode.innerText = inputNode.value;
  inputNode.remove();
}

function deleteRow() {
  const thisCell = this.parentNode;
  const thisRow = thisCell.parentNode;
  if (thisRow) {
    thisRow.remove();
  }
}

function addRow() {
  const row = mainTable.insertRow(-1);
  row.className = "table-row";

  for (i = 0; i < 3; i++) {
    const cell = row.insertCell(i);
    if (i < 2) {
      addToggleToInput(cell);
      cell.className = "cell";
    } else {
      cell.appendChild(addDeleteButton());
    }
  }
}

function prepopulateTable() {
  for (let i = 0; i < 4; i++) {
    addRow();
  }
  let counter = 1;
  const Cells = document.querySelectorAll(".cell");
  Cells.forEach((el) => {
    el.innerText = `Cell ${counter}`;
    addToggleToInput(el);
    counter++;
  });
}

prepopulateTable();
