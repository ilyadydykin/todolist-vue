<template>
  <div class="create-todo border">
    <div class="create-todo__head margin-top-10">
      <h3>Добавление задачи</h3>
    </div>
    <div class="create-todo__inputs margin-top-10">
      <input
        v-model="newTodo.title"
        type="text"
        placeholder="Название"
        class="create-todo--name"
      />
      <textarea
        v-model="newTodo.description"
        name="descr"
        class="create-todo--descr margin-top-10"
        placeholder="Описание"
        rows="3"
      ></textarea>
    </div>
    <div class="create-todo__status status margin-top-10">
      <button
        class="btn btn-small status--low"
        @click="changeStatus(newTodo, 0)"
      >
        Неважно
      </button>
      <button
        class="btn btn-small status--high"
        @click="changeStatus(newTodo, 1)"
      >
        Срочно
      </button>
      <button
        class="btn btn-small status--critical"
        @click="changeStatus(newTodo, 2)"
      >
        Оч. срочно
      </button>
    </div>
    <div class="create-todo__add margin-top-10">
      <button class="btn btn-big" @click="addTodo">
        Добавить задачу
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      newTodo: "newTodo"
    })
  },
  methods: {
    addTodo() {
      if (this.newTodo?.title) {
        this.$store.dispatch("addTodo", this.newTodo);
        this.$store.dispatch("clearTodo", this.newTodo);
      }
    },
    changeStatus(todo, status) {
      todo.status = status;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/create";
</style>
