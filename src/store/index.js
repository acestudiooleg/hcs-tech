import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import { pureMutation } from '@/utils';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: pureMutation({
    auth,
  }),
  strict: true,
});
