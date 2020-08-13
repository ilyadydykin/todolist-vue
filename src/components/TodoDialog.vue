<template>
  <div class="todo-dialog border">
    <div class="todo-dialog__head margin-top-10">
      <h3>{{ title }}</h3>
    </div>
    <div class="todo-dialog__inputs margin-top-10">
      <input
        v-model="todo.title"
        type="text"
        placeholder="Название"
        class="todo-dialog--name"
      />
      <textarea
        v-model="todo.description"
        name="descr"
        class="todo-dialog--descr margin-top-10"
        placeholder="Описание"
        rows="3"
      ></textarea>
    </div>
    <div class="todo-dialog__status status margin-top-10">
      <button
        class="btn btn-small status--low"
        v-bind:class="{ active: todo.status == 0 }"
        @click="changeStatus(todo, 0)"
      >
        Неважно
      </button>
      <button
        class="btn btn-small status--high"
        v-bind:class="{ active: todo.status == 1 }"
        @click="changeStatus(todo, 1)"
      >
        Срочно
      </button>
      <button
        class="btn btn-small status--critical"
        v-bind:class="{ active: todo.status == 2 }"
        @click="changeStatus(todo, 2)"
      >
        Оч. срочно
      </button>
    </div>
    <div class="todo-dialog__add margin-top-10">
      <button class="btn btn-big" @click="addOrEditTodo">
        {{ btnMessage }}
      </button>
    </div>
    <div class="todo-dialog__close" @click="closeEdit" v-if="btnClose">
      <i class="close-icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    todo: {
      id: Number,
      title: String,
      description: String,
      status: Number,
      done: Boolean
    },
    btnMessage: String,
    btnClose: Boolean
  },
  methods: {
    addOrEditTodo() {
      if (this.todo?.title) {
        this.$store.dispatch("addOrEditTodo", this.todo);
        this.$store.dispatch("clearTodo", this.todo);
      }
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
.todo-dialog {
  position: relative;
  padding: 10px;

  &__status {
    display: flex;
    justify-content: space-between;
  }

  &__close {
    position: absolute;
    top: 15px;
    right: 10px;
  }
}
</style>
