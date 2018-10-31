import Vue from 'vue';
import Vuex from 'vuex';
import { pureMutation } from '@/utils';
import auth from './auth';
import todos from './todos';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: pureMutation({
    auth,
    todos,
  }),
  strict: true,
});

export const { dispatch, commit } = store;

export default store;
