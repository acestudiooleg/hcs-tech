<template>
  <div class="todo-list">
    <h2>Todo List</h2>
    <div class="input-group input-group-sm mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">What to do?</span>
      </div>
      <input type="text" class="form-control" v-model="newTitle" @keyup.enter="addItem(newTitle)">
    </div>
    <ul class="list-group">
      <todo-item
      v-for="todo in todos"
      :todo="todo"
      :key="todo._id"
      :onComplete="updateItem"
      :onDelete="deleteItem"
      />
    </ul>
    <hr>
    <b-form-group label="Button style radios">
      <b-form-radio-group
        id="btnradios1"
        buttons
        button-variant="primary"
        :value="filter"
        @change="setFilter"
        :options="filterButtons"
        name="radiosBtnDefault"
      />
    </b-form-group>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import TodoItem from "./TodoItem";
import { dispatch, commit } from "@/store";
import {
  TODOS_ADD_ITEM_ACTION,
  TODOS_GET_ITEMS_ACTION,
  TODOS_UPDATE_ITEM_ACTION,
  TODOS_DELETE_ITEM_ACTION,
  TODOS_SET_FILTER_MUTATION,
  } from "@/store/todos/types";
export default {
  name: 'TodoList',
  data: () => ({
    newTitle: '',
    filterButtons: [{
      text: 'All', value: 'all'
    },{
      text: 'Active', value: 'active'
    }, {
      text: 'Complete', value: 'complete'
    }]
  }),
  mounted(){
    dispatch(TODOS_GET_ITEMS_ACTION);
  },
  components:{
    TodoItem
  },
  computed: {
    ...mapState({
      filter: (state) => state.todos.filter
    }),
    ...mapGetters({
      todos: 'filteredTodos'
    })
  },
  methods: {
    async addItem(title){
      await dispatch(TODOS_ADD_ITEM_ACTION, { title });
      this.newTitle = '';
    },
    async updateItem(item, isCompleted){
      await dispatch(TODOS_UPDATE_ITEM_ACTION, { item, isCompleted });
    },
    async deleteItem(item){
      await dispatch(TODOS_DELETE_ITEM_ACTION, item);
    },
    setFilter(value){
      console.log(value);

      commit(TODOS_SET_FILTER_MUTATION, value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
