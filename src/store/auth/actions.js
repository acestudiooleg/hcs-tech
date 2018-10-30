import { actionsToMutationsMap } from '@/utils';

import { AUTH_LOGOUT_ACTION, AUTH_REMOVE_TOKEN_MUTATION } from './types';

export default {
  ...actionsToMutationsMap({
    [AUTH_LOGOUT_ACTION]: AUTH_REMOVE_TOKEN_MUTATION,
  }),
};
