export const newTodo = state => {
  return state.newTodo;
};
export const editTodo = state => state.editTodo;

export const todos = state => {
  return state.todoList
    .filter(todo => !todo.done)
    .sort((a, b) => (a.status < b.status ? 1 : -1));
};

export const completedTodos = state => {
  return state.todoList
    .filter(todo => todo.done)
    .sort((a, b) => (a.status < b.status ? 1 : -1));
};

export const isEdit = state => {
  return state.isEdit;
};
