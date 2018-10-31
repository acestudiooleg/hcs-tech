import {
  AUTH_REMOVE_USER_MUTATION,
  AUTH_SET_USER_MUTATION,
  AUTH_SET_ERRORS_MUTATION,
} from './types';
import { defaultState } from './state';

export default [
  [AUTH_REMOVE_USER_MUTATION, () => defaultState],
  [AUTH_SET_USER_MUTATION, (state, user) => ({ user })],
  [AUTH_SET_ERRORS_MUTATION, (state, errors) => ({ errors })],
];
