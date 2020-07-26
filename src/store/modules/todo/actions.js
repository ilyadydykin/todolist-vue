export const getTodo = ({ commit }) => commit("GET_TODO");
export const setTodo = ({ commit }) => commit("SET_TODO");
export const addTodo = ({ commit }, todo) => commit("ADD_TODO", todo);
export const editTodo = ({ commit }, todo) => commit("EDIT_TODO", todo);
export const closeEdit = ({ commit }) => commit("CLOSE_EDIT_TODO");
export const saveTodo = ({ commit }, todo) => commit("SAVE_TODO", todo);
export const removeTodo = ({ commit }, todo) => commit("REMOVE_TODO", todo);
export const completedTodo = ({ commit }, todo) => commit("COMPLETED_TODO", todo);
export const clearTodo = ({ commit }) => commit("CLEAR_TODO");

