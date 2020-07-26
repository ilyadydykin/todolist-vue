export const GET_TODO = state => {
  let todoListStr = localStorage.getItem("todoList");
  let todoList = JSON.parse(todoListStr);
  state.todoList = todoList;
};

export const SET_TODO = state => {
  let todoListStr = JSON.stringify(state.todoList);
  localStorage.setItem("todoList", todoListStr);
};

export const ADD_TODO = (state, todo) => {
  state.todoList.push({
    id: state.todoList.length + 1,
    title: todo.title,
    description: todo.description,
    status: todo.status,
    done: false
  });

  // если понадобиться
  // let todoListStr = JSON.stringify(state.todoList);
  // localStorage.setItem("todoList", todoListStr);
};

export const EDIT_TODO = (state, todo) => {
  if (state?.isEdit) {
    state.isEdit = false;
  } else {
    var todoEd = todo;
    state.editTodo = todoEd;
    state.isEdit = true;
  }
};

export const CLOSE_EDIT_TODO = state => {
  state.isEdit = false;
};

export const SAVE_TODO = (state, todo) => {
  let todos = state.todoList;
  todos.map(t => {
    return t.id == todo.id ? todo : t;
  });
  state.todoList = todos;
  state.isEdit = false;

  // если понадобиться
  // let todoListStr = JSON.stringify(state.todoList);
  // localStorage.setItem("todoList", todoListStr);
};

export const REMOVE_TODO = (state, todo) => {
  let todos = state.todoList;
  todos.splice(todos.indexOf(todo), 1);
  state.todoList = todos;

  // если понадобиться
  // let todoListStr = JSON.stringify(state.todoList);
  // localStorage.setItem("todoList", todoListStr);
};

export const COMPLETED_TODO = (state, todo) => {
  todo.done = !todo.done;
};

export const CLEAR_TODO = state => {
  state.newTodo = [
    {
      id: 0,
      title: "",
      description: "",
      status: 0,
      done: false
    }
  ];
};

export const UPDATE_LOCAL_STORAGE = state => {
  window.localStorage = state;
};
