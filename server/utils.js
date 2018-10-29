import { omit } from 'lodash/fp';

export const removePassword = omit(['password']);

export const cage = handler => (req, res, next) => {
  try {
    handler(req, res, next);
  } catch (error) {
    next(error);
    console.error(error);
    if (next instanceof Function) {
      next(error);
    }
  }
};
