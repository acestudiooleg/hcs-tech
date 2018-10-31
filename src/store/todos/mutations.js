import {
  TODOS_SET_ITEMS_MUTATION,
  TODOS_ADD_ITEM_MUTATION,
  TODOS_DELETE_ITEM_MUTATION,
  TODOS_UPDATE_ITEM_MUTATION,
  TODOS_SET_FILTER_MUTATION,
} from './types';
import { createMethodChangeItemInList } from '@/utils';

const updateInTodoList = createMethodChangeItemInList();

export default [
  [TODOS_SET_ITEMS_MUTATION, (state, list) => ({ list })],
  [
    TODOS_ADD_ITEM_MUTATION,
    (state, item) => {
      state.list.push(item);
      return { list: state.list };
    },
  ],
  [
    TODOS_DELETE_ITEM_MUTATION,
    (state, id) => ({ list: state.list.filter((e) => e._id !== id) }),
  ],
  [TODOS_UPDATE_ITEM_MUTATION, updateInTodoList((itemFromList, item) => item)],
  [TODOS_SET_FILTER_MUTATION, (state, filter) => ({ filter })],
];
