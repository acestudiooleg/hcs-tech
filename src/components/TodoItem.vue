<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <input @change="onComplete(todo, !todo.isCompleted)" :checked="todo.isCompleted" type="checkbox">
     <span :class="{completed: todo.isCompleted}">{{todo.title}}</span>
    <span @click="onDelete(todo)" class="badge badge-danger badge-pill">X</span>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: Object,
    onDelete: Function,
    onComplete: Function
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.completed {
  text-decoration: line-through;
}
</style>
