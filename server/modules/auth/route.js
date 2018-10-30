import { login, me, protect } from './controller';

export default (app) => {
  app.post('/login', login);
  app.get('/me', me);
  app.use('/api/*', protect);
};
