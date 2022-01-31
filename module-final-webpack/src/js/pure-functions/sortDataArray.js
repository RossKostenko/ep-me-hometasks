import { compareStrings } from "./compare-strings";

export function sortDataArray(array, sortType) {
  switch (sortType) {
    case "records_asc":
      return array.sort((a, b) => compareStrings(a.taskName, b.taskName));
    case "records_desc":
      return array.sort((a, b) => compareStrings(b.taskName, a.taskName));
    case "creation_date_asc":
      return array.sort((a, b) => a.timeCreated - b.timeCreated);
    case "creation_date_desc":
      return array.sort((a, b) => b.timeCreated - a.timeCreated);
    default:
      return (todoArray = array.sort((a, b) => a.taskName - b.taskName));
  }
}
