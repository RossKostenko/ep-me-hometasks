import { compareStrings } from "./compare-strings";

export function sortDataArray(array, sortType) {
  switch (sortType) {
    case "records_asc":
      return array.sort((a, b) => compareStrings(a.taskName, b.taskName));
    case "records_desc":
      return array.sort((a, b) => compareStrings(b.taskName, a.taskName));
    case "creation_date_asc":
      return array.sort((a, b) =>
        compareStrings(a.timestampCreated, b.timestampCreated)
      );
    case "creation_date_desc":
      return array.sort((a, b) =>
        compareStrings(b.timestampCreated, a.timestampCreated)
      );
    case "due_date_asc":
      return array.sort((a, b) =>
        compareStrings(a.timestampDone, b.timestampDone)
      );
    case "due_date_desc":
      return array.sort((a, b) =>
        compareStrings(b.timestampDone, a.timestampDone)
      );
    default:
      return;
  }
}
