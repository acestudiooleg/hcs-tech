import User from './model';
import { cage } from '../../utils';
import { useMocks } from '../../config';

const createUser = cage(async (user) => {
  const finalUser = new User(user);

  finalUser.setPassword(user.password);

  await finalUser.save();
  return finalUser.toAuthJSON();
});

const createMockUser = async () => {
  const user = {
    email: 'admin@example.com',
    password: 'admin',
    firstname: 'admin',
    lastname: 'adminson',
  };
  const length = await User.count();
  if (length === 0) {
    console.log('---------------CREATE USER -------------');
    await createUser(user);
  }
};

if (useMocks) {
  createMockUser();
}

export const create = cage(async ({ body }, res) => {
  const { user } = body;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = await createUser(user);
  return res.json({
    user: finalUser,
  });
});

export const read = cage(async ({ params }, res) => res.send(await User.findById(params.id)));

export const update = cage(async ({ params, body }, res) =>
  res.send(await User.findByIdAndUpdate(params.id, body)));

export const remove = cage(async ({ params }, res) =>
  res.send(await User.findByIdAndRemove(params.id)));

export const all = cage(async ({ query }, res) => {
  const q = Object.keys(query).length ? User.find(query) : User.find();
  res.send(await q.exec());
});
