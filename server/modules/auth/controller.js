import passport from 'passport';
import LocalStrategy from 'passport-local';
import passportJWT from 'passport-jwt';
import User from '../users/model';
import { removePassword } from '../../utils';
import { jwtsecret } from '../../config';

const { Strategy: JwtStrategy, ExtractJwt } = passportJWT;

const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtsecret,
};

const localAuthorize = async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !user.validatePassword(password)) {
      return done(null, false, { errors: { 'email or password': 'is invalid' } });
    }
    return done(null, removePassword(user));
  } catch (error) {
    return done(error);
  }
};

const getUserByToken = async ({ id }, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user || false);
  } catch (error) {
    return done(error);
  }
};

passport.use(new LocalStrategy(localOptions, localAuthorize));
passport.use(new JwtStrategy(jwtOptions, getUserByToken));

export const login = (req, res, next) =>
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user) {
      return res.json({ user: user.toAuthJSON() });
    }

    return res.sendStatus(401);
  })(req, res, next);

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

export const protect = userByToken();
export const me = userByToken(true);
