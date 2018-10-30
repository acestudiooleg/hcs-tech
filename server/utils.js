import { omit } from 'lodash/fp';

export const removePassword = omit(['hash', 'salt']);

export const cage = (handler = () => 1) => async (req, res, next) => {
  try {
    return await handler(req, res, next);
  } catch (error) {
    if (next instanceof Function) {
      return next(error);
    }
    return null;
  }
};

export default {
  removePassword,
  cage,
};
