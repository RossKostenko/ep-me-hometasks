import { sortDataArray } from "../pure-functions/sortDataArray";
import { renderTable } from "../pure-functions/render-elements";

export function renderTodoList(todoValue) {
  const todoArrayUnsorted = todoValue.items.filter((item) => !item.done);
  const sortedData = sortDataArray(todoArrayUnsorted, todoValue.sortingTodo);

  console.log("renderTodoList: ", sortedData);
  renderTable(sortedData, "todo-table", "Open");
}
