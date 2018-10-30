import User from './model';
import { cage, removePassword } from '../../utils';
import { useMocks } from '../../config';

/**
 * @module Users/Controller
 */

/**
 * Creates new user in databse and generate token
 * @method createUser
 * @param {String} user.email
 * @param {String} user.password
 * @param {String} user.firstname
 * @param {String} user.lastname
 * @param {Number} user.age
 * @memberof Users/Controller
 */
const createUser = cage(async (user) => {
  const finalUser = new User(user);

  finalUser.setPassword(user.password);

  await finalUser.save();
  return finalUser.toAuthJSON();
});

/**
 * Creates default user for first db initialization
 * @method createMockUser
 * @memberof Users/Controller
 */
const createMockUser = async () => {
  const user = {
    email: 'admin@example.com',
    password: 'admin',
    firstname: 'admin',
    lastname: 'adminson',
  };
  const length = await User.countDocuments();
  if (length === 0) {
    console.log('---------------CREATE USER -------------');
    await createUser(user);
  }
};

if (useMocks) {
  createMockUser();
}
/**
 * Creates new user
 * @method create
 * @param {String} req.body.email
 * @param {String} req.body.password
 * @param {String} req.body.firstname
 * @param {String} req.body.lastname
 * @param {Number} req.body.age
 * @memberof Users/Controller
 */
export const create = cage(async ({ body }, res) => {
  if (!body.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!body.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = await createUser(body);
  return res.json(removePassword(finalUser));
});

/**
 * Find user by id
 * @method read
 * @param {String} req.params.id - user hash id
 * @memberof Users/Controller
 */
export const read = cage(async ({ params }, res) =>
  res.send(removePassword(await User.findById(params.id).lean())));

/**
 * Update user by id
 * @method update
 * @param {String} req.params.id - user hash id
 * @param {String} req.body.email
 * @param {String} req.body.password
 * @param {String} req.body.firstname
 * @param {String} req.body.lastname
 * @param {Number} req.body.age
 * @memberof Users/Controller
 */
export const update = cage(async ({ params, body }, res) =>
  res.send(removePassword(await User.findByIdAndUpdate(params.id, body).lean())));

/**
 * Delete user by id
 * @method remove
 * @param {String} req.params.id - user hash id
 */
export const remove = cage(async ({ params }, res) =>
  res.send(await User.findByIdAndRemove(params.id)));

/**
 * Get all users by filter
 * @method all
 * @param {Object} req.query - filter queries
 * @memberof Users/Controller
 */
export const all = cage(async ({ query }, res) => {
  const q = Object.keys(query).length ? User.find(query) : User.find();
  const users = await q.lean().exec();
  res.send(users.map(removePassword));
});

export default {
  create,
  read,
  update,
  remove,
  all,
};
