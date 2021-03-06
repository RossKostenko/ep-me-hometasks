import { sortDataArray } from "../pure-functions/sort-data-array";
import { renderTable } from "../pure-functions/render-elements";

export function renderTodoList(todoValue) {
  const todoArrayUnsorted = todoValue.items.filter((item) => !item.done);
  const sortedData = sortDataArray(todoArrayUnsorted, todoValue.sortingTodo);

  renderTable(sortedData, "todo-table", "Open");
}
