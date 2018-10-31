import http from 'axios';
import { get } from 'lodash';
import { transitionTo } from '@/router';
import { setToken } from '@/utils';
import {
  AUTH_LOGIN_ACTION,
  AUTH_LOGOUT_ACTION,
  AUTH_SET_USER_MUTATION,
  AUTH_REMOVE_USER_MUTATION,
  AUTH_GET_USER_ACTION,
  AUTH_SET_ERRORS_MUTATION,
} from './types';

export default {
  async [AUTH_LOGIN_ACTION]({ commit }, { email, password }) {
    try {
      const { data: user } = await http.post('/login', { email, password });

      setToken(user.token);
      commit(AUTH_SET_USER_MUTATION, user);
      transitionTo('home');
      return user;
    } catch (error) {
      console.error(error);
      const errors = get(error, 'response.data.errors');
      commit(AUTH_SET_ERRORS_MUTATION, errors);
    }
  },
  [AUTH_LOGOUT_ACTION]({ commit }) {
    commit(AUTH_REMOVE_USER_MUTATION);
    setToken('');
    transitionTo('login');
  },
  async [AUTH_GET_USER_ACTION]({ commit }) {
    try {
      const { data: user } = await http.get('/me');
      commit(AUTH_SET_USER_MUTATION, user);
      return user;
    } catch (error) {
      console.error(error.data);
      return get(error, 'response.data.errors');
    }
  },
};
