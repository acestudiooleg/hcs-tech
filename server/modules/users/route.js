import { create, read, update, remove, all } from './controller';
import { protect } from '../auth/controller';

export default (app) => {
  app
    .route('/api/users')
    .get(protect, all)
    .post(create);

  app
    .route('/api/users/:id')
    .all(protect)
    .get(read)
    .put(update)
    .delete(remove);
};
