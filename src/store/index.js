import Vue from 'vue';
import Vuex from 'vuex';
import { pureMutation } from '@/utils';
import auth from './auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: pureMutation({
    auth,
  }),
  strict: true,
});

export const { dispatch, commit } = store;

export default store;
