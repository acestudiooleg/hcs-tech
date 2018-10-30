import { login, me } from './controller';

export default (app) => {
  app.post('/login', login);
  app.get('/me', me);
};
