import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../users/model';
import { removePassword, cage } from '../../utils';

const authorize = cage(async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !user.validatePassword(password)) {
      return done(null, false, { errors: { 'email or password': 'is invalid' } });
    }
    return done(null, removePassword(user));
  } catch (error) {
    return done(error);
  }
});

export const startegy = new LocalStrategy(
  {
    usernameField: 'user[email]',
    passwordField: 'user[password]',
  },
  authorize,
);

export const login = cage((req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(400).send(info);
  })(req, res, next);
});

export const me = cage(async ({ payload: { id } }, res) => {
  const user = await User.findById(id);
  if (!user) {
    return res.sendStatus(400);
  }
  return res.json({ user: user.toAuthJSON() });
});
