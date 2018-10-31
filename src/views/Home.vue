<template>
  <v-layout>
    <div class="container">
      <todo-list/>
    </div>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import VLayout from '@/layouts/Default.vue';
import TodoList from '@/components/TodoList.vue';

export default {
  name: 'home',
  components: {
    VLayout,
    TodoList,
  },
};
</script>
