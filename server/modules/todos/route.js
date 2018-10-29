import { create, read, update, remove, all } from './controller';

export default (app) => {
  app.route('/api/todos')
    .get(all)
    .post(create);

  app.route('/api/todos/:id')
    .get(read)
    .put(update)
    .delete(remove);
};
