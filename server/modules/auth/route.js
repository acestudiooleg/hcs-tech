import jwt from 'express-jwt';
import passport from 'passport';
import { startegy, login, me } from './controller';

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const required = jwt({
  secret: 'secret',
  userProperty: 'payload',
  getToken: getTokenFromHeaders,
});

const optional = jwt({
  secret: 'secret',
  userProperty: 'payload',
  getToken: getTokenFromHeaders,
  credentialsRequired: false,
});

export default (app) => {
  passport.use(startegy);
  app.post('/login', optional, login);
  app.get('/me', required, me);
  app.use('/api/*', optional);
};
