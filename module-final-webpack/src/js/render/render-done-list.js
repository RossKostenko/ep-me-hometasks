import { sortDataArray } from "../pure-functions/sort-data-array";
import { renderTable } from "../pure-functions/render-elements";

export function renderDoneList(todoValue) {
  const todoArrayUnsorted = todoValue.items.filter((item) => item.done);
  const sortedData = sortDataArray(todoArrayUnsorted, todoValue.sortingDone);

  renderTable(sortedData, "done-table", "Done");
}
