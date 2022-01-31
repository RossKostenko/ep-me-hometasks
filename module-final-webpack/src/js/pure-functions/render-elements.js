import { showTime } from "../pure-functions/show-time";

export function renderTable(array, id, tableName) {
  const tableWrapper = document.getElementById(id);
  tableWrapper.appendChild(createTable(array, `${id}-content`, tableName));
  return tableWrapper;
}

function createTable(array, id, tableName) {
  const listBody = document.createElement("div");
  listBody.id = id;
  listBody.className = id;
  array.forEach((el) => {
    listBody.appendChild(renderRow(el));
  });
  listBody.appendChild(addDeleteButton(tableName));
  return listBody;
}

function addDeleteButton(tableName) {
  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "remove-table-wrapper";
  const button = buttonWrapper.appendChild(document.createElement("button"));
  button.className = "remove-table-button";
  button.innerText = `Clear "${tableName}" list`;
  return buttonWrapper;
}

function renderRow(el) {
  const row = document.createElement("div");
  row.id = el.id;
  row.className = "table-row";

  const cellOne = row.appendChild(document.createElement("div"));
  cellOne.className = "checkbox-wrapper";
  const doneCheckbox = document.createElement("input");
  doneCheckbox.type = "checkbox";
  doneCheckbox.className = "checkbox-input";
  doneCheckbox.checked = el.done;
  cellOne.appendChild(doneCheckbox);

  const cellTwo = row.appendChild(document.createElement("div"));
  cellTwo.className = "message";
  cellTwo.innerText = el.taskName;

  const cellThree = row.appendChild(document.createElement("div"));
  cellThree.className = "d-flex";

  const cellThreeTime = cellThree.appendChild(document.createElement("div"));
  cellThreeTime.className = "time";
  cellThreeTime.innerText = showTime(el.timestampCreated);

  const cellThreeDelete = cellThree.appendChild(document.createElement("div"));
  cellThreeDelete.className = "delete";

  return row;
}
