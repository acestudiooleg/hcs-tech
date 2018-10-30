import { create, read, update, remove, all, findAllByUser } from './controller';
import { protect } from '../auth/controller';

export default (app) => {
  app
    .route('/api/todos')
    .all(protect)
    .get(all)
    .post(create);

  app
    .route('/api/todos/user/:id')
    .all(protect)
    .get(findAllByUser);

  app
    .route('/api/todos/:id')
    .all(protect)
    .get(read)
    .put(update)
    .delete(remove);
};
