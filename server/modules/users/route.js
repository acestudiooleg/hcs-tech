import { create, read, update, remove, all } from './controller';

export default (app) => {
  app.route('/api/users')
    .get(all)
    .post(create);

  app.route('/api/users/:id')
    .get(read)
    .put(update)
    .delete(remove);
};
