export function setDoneSorting(value) {
  const doneSortingSelect = document.getElementById("done-sorting");
  doneSortingSelect.value = value.sortingDone;
}

export function setTodoSorting(value) {
  const todoSortingSelect = document.getElementById("todo-sorting");
  todoSortingSelect.value = value.sortingTodo;
}
