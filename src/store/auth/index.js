import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';
import { logger } from '@/utils';

export default {
  ...logger(actions),
  getters,
  mutations,
  state,
};
