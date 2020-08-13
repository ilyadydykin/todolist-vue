export default {
  state: {
    todoList: [],
    newTodo: {
      id: -1,
      title: "",
      description: "",
      status: 0,
      done: false
    },
    editTodo: {
      id: 0,
      title: "",
      description: "",
      status: 0,
      done: false
    },
    isEdit: false
  },
  mutations: {
    GET_TODO: state => {
      let todoListStr = localStorage.getItem("todoList");
      let todoList = JSON.parse(todoListStr);

      if (!todoList) todoList = [];

      state.todoList = todoList;
    },

    SET_TODO: state => {
      let todoListStr = JSON.stringify(state.todoList);
      localStorage.setItem("todoList", todoListStr);
    },

    ADD_TODO: (state, todo) => {
      state.todoList.push({
        id: state.todoList.length + 1,
        title: todo.title,
        description: todo.description,
        status: todo.status ?? 0,
        done: false
      });
    },

    EDIT_TODO: (state, todo) => {
      if (state?.isEdit) {
        state.isEdit = false;
      } else {
        state.editTodo = Object.assign({}, todo);
        state.isEdit = true;
      }
    },

    CLOSE_EDIT_TODO: state => {
      state.isEdit = false;
    },

    SAVE_TODO: (state, todo) => {
      state.todoList = state.todoList.map(t => {
        return t.id == todo.id ? todo : t;
      });
      state.isEdit = false;
    },

    REMOVE_TODO: (state, todo) => {
      let todos = state.todoList;
      todos.splice(todos.indexOf(todo), 1);
      state.todoList = todos;
    },

    COMPLETED_TODO: (state, todo) => {
      todo.done = !todo.done;
    },

    CLEAR_TODO: state => {
      state.newTodo = {
        id: -1,
        title: "",
        description: "",
        status: 0,
        done: false
      };
    }
  },
  getters: {
    newTodo: state => {
      return state.newTodo;
    },

    editTodo: state => state.editTodo,

    todos: state => {
      return state.todoList
        .filter(todo => !todo.done)
        .sort((a, b) => (a.status < b.status ? 1 : -1));
    },

    completedTodos: state => {
      return state.todoList
        .filter(todo => todo.done)
        .sort((a, b) => (a.status < b.status ? 1 : -1));
    },

    isEdit: state => {
      return state.isEdit;
    }
  },
  actions: {
    getTodo: ({ commit }) => commit("GET_TODO"),
    setTodo: ({ commit }) => commit("SET_TODO"),
    addOrEditTodo: ({ commit, dispatch }, todo) => {
      if (todo?.id == -1) {
        commit("ADD_TODO", todo);
      } else {
        commit("SAVE_TODO", todo);
      }
      dispatch("setTodo");
    },
    addTodo: ({ commit, dispatch }, todo) => {
      commit("ADD_TODO", todo);
      dispatch("setTodo");
    },
    editTodo: ({ commit }, todo) => commit("EDIT_TODO", todo),
    closeEdit: ({ commit }) => commit("CLOSE_EDIT_TODO"),
    saveTodo: ({ commit, dispatch }, todo) => {
      commit("SAVE_TODO", todo);
      dispatch("setTodo");
    },
    removeTodo: ({ commit, dispatch }, todo) => {
      commit("REMOVE_TODO", todo);
      dispatch("setTodo");
    },
    completedTodo: ({ commit, dispatch }, todo) => {
      commit("COMPLETED_TODO", todo);
      dispatch("setTodo");
    },
    clearTodo: ({ commit }) => commit("CLEAR_TODO")
  }
};
