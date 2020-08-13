<template>
  <div id="app">
    <header>
      <h1 class="title">{{ title }}</h1>
    </header>
    <div class="todo-panel">
      <div class="todo-aside">
        <todo-dialog
          v-bind:class="'todo-aside__item'"
          :title="'Добавление задачи'"
          :todo="newTodo"
          :btnMessage="'Добавить задачу'"
          :btnClose="false"
        ></todo-dialog>
        <todo-dialog
          v-bind:class="'todo-aside__item'"
          :title="'Изменение задачи'"
          :todo="editTodo"
          :btnMessage="'Измененить задачу'"
          :btnClose="true"
          v-if="isEdit"
        ></todo-dialog>
      </div>
      <div class="todo-content">
        <div class="tabs">
          <ul class="nav-tabs">
            <li class="nav-item">
              <a
                @click="setActive('current')"
                :class="{ active: isActive('current') }"
                href="#current"
                class="nav-link"
              >
                Текущие задачи
              </a>
            </li>
            <li class="nav-item">
              <a
                @click="setActive('completed')"
                :class="{ active: isActive('completed') }"
                href="#completed"
                class="nav-link"
              >
                Выполненые задачи
              </a>
            </li>
          </ul>
          <div id="myTabContent" class="tab-content border">
            <div
              id="current"
              :class="{ active: isActive('current') }"
              class="tab-panel"
            >
              <todo-list :todos="todos"></todo-list>
            </div>
            <div
              id="completed"
              :class="{ active: isActive('completed') }"
              class="tab-panel"
            >
              <todo-list :todos="completedTodos"></todo-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import todoDialog from "./components/TodoDialog";
import TodoList from "./components/TodoList";

export default {
  name: "App",
  components: {
    todoDialog,
    TodoList
  },
  data() {
    return {
      title: "To-do list",
      titleTab: "Текущие задачи",
      titleTab2: "Выполненые задачи",
      activeItem: "current"
    };
  },
  computed: {
    ...mapGetters({
      isEdit: "isEdit",
      newTodo: "newTodo",
      editTodo: "editTodo",
      todos: "todos",
      completedTodos: "completedTodos"
    })
  },
  mounted: function() {
    this.getTodo();
  },
  beforeUpdate: function() {
    this.setTodo();
  },
  methods: {
    getTodo() {
      this.$store.dispatch("getTodo");
    },
    setTodo() {
      this.$store.dispatch("setTodo");
    },

    isActive(menuItem) {
      return this.activeItem === menuItem;
    },

    setActive(menuItem) {
      this.activeItem = menuItem;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.border {
  border: 1px solid;
}

.todo-panel {
  display: flex;
  justify-content: space-around;
}

.todo-aside {
  margin: 15px;
  width: 20%;
  box-sizing: border-box;
}

.todo-content {
  margin: 15px;
  width: 80%;
  box-sizing: border-box;
}

.title {
  text-align: center;
}

.todo-aside__item:not(:first-child) {
  margin-top: 15px;
}

h3 {
  margin: 0;
  font-size: 16px;
}

input[type="text"] {
  padding: 5px 10px;
  border: 1px solid;
  border-radius: 5px;
  width: 100%;
  font-size: 14px;
  box-sizing: border-box;
}

textarea {
  width: 100%;
  border: 1px solid;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  line-height: 1.5;
  box-sizing: border-box;
  resize: none;
}

.margin-top-10 {
  margin-top: 10px;
}

.btn {
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #9e9e9e;
  border-radius: 5px;
}

.btn.active {
  outline: -webkit-focus-ring-color auto 1px;
}

.btn-big {
  width: 100%;
  padding: 7px;
}

.btn-small {
  width: 30%;
  padding: 7px;
}

.status--low {
  background-color: #caff7a;
}

.status--high {
  background-color: #ffff7d;
}

.status--critical {
  background-color: #ff5c5c;
}

.nav-tabs {
  margin: 0;
  margin-left: 10px;
  padding: 0;
  display: flex;
  list-style-type: none;
}

.nav-item {
  border: 1px solid;
  border-bottom: none;
}

.nav-item:not(:first-child) {
  border-left: none;
}

.tab-panel {
  padding: 25px 15px;
}

.todo-item:not(:first-child) {
  margin-top: 15px;
}

.todo-item__status {
  border-right: 1px solid;
  width: 1%;
}

.todo-item {
  display: flex;
}

.todo-item__content {
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  box-sizing: border-box;
}

.todo-item__content-head {
  display: flex;
  align-items: center;
}

.status-checkbox {
  margin-right: 15px;
}

.nav-link {
  padding: 15px;
  display: flex;
  text-decoration: none;
  color: inherit;
}

.nav-item .nav-link.active {
  background-color: #ffda00;
}

.tab-panel {
  display: none;
}

.tab-panel.active {
  display: flex;
}

.todo-list {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.close-icon:before {
  content: "";
  display: block;
  width: 24px;
  height: 24px;
  background: url("./assets/icons/close.svg") no-repeat center center;
  background-size: contain;
}

.todo-item__toolbar {
  width: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.edit-icon:before {
  content: "";
  display: block;
  width: 24px;
  height: 24px;
  background: url("./assets/icons/edit.svg") no-repeat center center;
  background-size: contain;
}

.remove-icon:before {
  content: "";
  display: block;
  width: 24px;
  height: 24px;
  background: url("./assets/icons/delete.svg") no-repeat center center;
  background-size: contain;
}
</style>
