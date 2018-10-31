import http from 'axios';
import { get } from 'lodash';
import {
  TODOS_GET_ITEMS_ACTION,
  TODOS_ADD_ITEM_ACTION,
  TODOS_DELETE_ITEM_ACTION,
  TODOS_UPDATE_ITEM_ACTION,
  TODOS_SET_ITEMS_MUTATION,
  TODOS_ADD_ITEM_MUTATION,
  TODOS_DELETE_ITEM_MUTATION,
  TODOS_UPDATE_ITEM_MUTATION,
} from './types';

export default {
  async [TODOS_GET_ITEMS_ACTION]({ commit }) {
    try {
      const { data: todos } = await http.get('/api/todos');
      commit(TODOS_SET_ITEMS_MUTATION, todos);
    } catch (error) {
      console.log(error);
    }
  },
  async [TODOS_ADD_ITEM_ACTION]({ commit, rootState }, item) {
    try {
      const { data: todo } = await http.post('/api/todos', {
        ...item,
        userId: rootState.auth.user._id,
      });
      commit(TODOS_ADD_ITEM_MUTATION, { ...todo, ...item });
    } catch (error) {
      console.log(error);
    }
  },
  async [TODOS_DELETE_ITEM_ACTION]({ commit }, { _id }) {
    try {
      await http.delete(`/api/todos/${_id}`);
      commit(TODOS_DELETE_ITEM_MUTATION, _id);
    } catch (error) {
      console.log(error);
    }
  },
  async [TODOS_UPDATE_ITEM_ACTION]({ commit }, { item, isCompleted }) {
    try {
      const newTodo = { ...item, isCompleted };
      await http.put(`/api/todos/${item._id}`, newTodo);
      commit(TODOS_UPDATE_ITEM_MUTATION, newTodo);
    } catch (error) {
      console.log(error);
    }
  },
};
