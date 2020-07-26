<template>
  <div class="todo-aside__item edit-todo border">
    <div class="edit-todo__head margin-top-10">
      <h3>Изменение задачи</h3>
    </div>
    <div class="edit-todo__inputs margin-top-10">
      <input
        v-model="editTodo.title"
        type="text"
        placeholder="Название"
        class="create-todo--name"
      /><textarea
        v-model="editTodo.description"
        name="descr"
        class="create-todo--descr margin-top-10"
        placeholder="Описание"
        style=""
        rows="3"
      ></textarea>
    </div>
    <div class="edit-todo__status status margin-top-10">
      <button
        class="btn btn-small status--low"
        @click="changeStatus(editTodo, 0)"
      >
        Неважно
      </button>
      <button
        class="btn btn-small status--high"
        @click="changeStatus(editTodo, 1)"
      >
        Срочно
      </button>
      <button
        class="btn btn-small status--critical"
        @click="changeStatus(editTodo, 2)"
      >
        Оч. срочно
      </button>
    </div>
    <div class="edit-todo__add margin-top-10">
      <button class="btn btn-big" @click="saveEdit">
        Изменить задачу
      </button>
    </div>
    <div class="edit-todo__close" @click="closeEdit">
      <i class="close-icon"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      editTodo: "editTodo"
    })
  },
  methods: {
    saveEdit(todo) {
      this.$store.dispatch("saveTodo", todo);
    },

    closeEdit() {
      this.$store.dispatch("closeEdit");
    },
    changeStatus(todo, status) {
      todo.status = status;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/edit";
</style>
