<template>
  <div id="app">
    <header>
      <h1 class="title">{{ title }}</h1>
    </header>
    <div class="todo-panel">
      <div class="todo-aside">
        <create-todo v-bind:class="'todo-aside__item'"></create-todo>
        <edit-todo v-bind:class="'todo-aside__item'" v-if="isEdit"></edit-todo>
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
              <todo-list></todo-list>
            </div>
            <div
              id="completed"
              :class="{ active: isActive('completed') }"
              class="tab-panel"
            >
              <completed-todo-list></completed-todo-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";
import TodoList from "./components/TodoList";
import CompletedTodoList from "./components/CompletedTodoList";

export default {
  name: "App",
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
      isEdit: "isEdit"
    })
  },
  mounted: function() {
    this.getTodo();
  },
  beforeUpdate: function() {
    this.setTodo();
  },
  components: {
    CreateTodo,
    CompletedTodoList,
    EditTodo,
    TodoList
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
@import "/assets/scss/general";
</style>
