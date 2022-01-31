import { sortDataArray } from "../pure-functions/sortDataArray";
import { renderTable } from "../pure-functions/render-elements";

export function renderDoneList(todoValue) {
  const todoArrayUnsorted = todoValue.items.filter((item) => item.done);
  const sortedData = sortDataArray(todoArrayUnsorted, todoValue.sortingDone);

  console.log("renderDoneList: ", sortedData);
  renderTable(sortedData, "done-table", "Done");
}
