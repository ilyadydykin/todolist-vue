<template>
  <div class="todo-list">
    <div v-for="todo in todos" :key="todo.id" class="todo-item border">
      <div class="todo-item__status" :class="getStatusClass(todo.status)"></div>
      <div class="todo-item__content">
        <div class="todo-item__content-head">
          <input
            v-model="todo.done"
            type="checkbox"
            @click="changeCheckbox(todo)"
            class="status-checkbox"
          />
          <h3>{{ todo.title }}</h3>
        </div>
        <div class="todo-item__content-descr margin-top-10">
          {{ todo.description }}
        </div>
      </div>
      <div class="todo-item__toolbar">
        <div class="todo-item__toolbar-edit" @click="edit(todo)">
          <i class="edit-icon"></i>
        </div>
        <div class="todo-item__toolbar-remove" @click="remove(todo)">
          <i class="remove-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todos: Array
  },
  methods: {
    edit(todo) {
      this.$store.dispatch("editTodo", todo);
    },

    remove(todo) {
      this.$store.dispatch("removeTodo", todo);
    },

    changeCheckbox(todo) {
      this.$store.dispatch("completedTodo", todo);
    },

    getStatusClass(status) {
      switch (status) {
        case 1:
          return "status--high";
        case 2:
          return "status--critical";
        case 0:
        default:
          return "status--low";
      }
    }
  }
};
</script>
