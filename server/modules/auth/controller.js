import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../users/model';
import { cage } from '../../utils';
import { jwtsecret } from '../../config';

/**
 * @module Auth/Controller
 */

const { Strategy: JwtStrategy, ExtractJwt } = passportJWT;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtsecret,
};

/**
 * Provides user data by extracted data from token
 * @param {Object} payload - data extracted from token
 * @param {Function} done - next middleware handler
 * @memberof Auth/Controller
 */
const getUserByToken = async ({ id }, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user || false);
  } catch (error) {
    return done(error);
  }
};

passport.use(new JwtStrategy(jwtOptions, getUserByToken));

/**
 * Provides user from database by email and password
 * @param {String} email
 * @param {String} password
 * @param {Function} done
 * @memberof Auth/Controller
 */
export const login = cage(async ({ body: { email, password } }, res) => {
  const user = await User.findOne({ email });
  if (!user || !user.validatePassword(password)) {
    return res.status(401).send({ errors: { 'email or password': 'is invalid' } });
  }
  return res.json(user.toAuthJSON());
});

/**
 * Creates function for check protected routes
 * @param {*} isEndpoint - used to route me which provide user object by token
 * @memberof Auth/Controller
 */
const userByToken = isEndpoint => (req, res, next) =>
  passport.authenticate('jwt', (err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      return isEndpoint ? res.json(user) : next();
    }
    return res.sendStatus(401);
  })(req, res, next);

/**
 * Check user for allow access to protected route
 * @method protect
 * @param req - express middleware param
 * @param res - express middleware param
 * @param next - express middleware param
 * @memberof Auth/Controller
 */
export const protect = userByToken();

/**
 * Provide user object by provided token, used for route - /me
 * @method me
 * @param req - express middleware param
 * @param res - express middleware param
 * @param next - express middleware param
 * @memberof Auth/Controller
 */
export const me = userByToken(true);

export default {
  login,
  protect,
  me,
};
