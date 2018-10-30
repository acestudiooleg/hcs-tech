import { omit } from 'lodash/fp';

/**
 * @module Utils
 */

/**
 * Removes hash and salt from user object
 * @param {Object} user
 * @method removePassword
 * @memberof Utils
 */
export const removePassword = omit(['hash', 'salt']);

/**
 * Universal error catcher for async/await based middlewares
 * @param {Function} handler - Express middleware
 * @memberof Utils
 */
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
