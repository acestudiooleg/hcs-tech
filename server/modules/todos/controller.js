import Todo from './model';
import { useMocks } from '../../config';
import { cage } from '../../utils';

const createMockTodos = async () => {
  const todos = [
    {
      title: 'Pass technical interview',
      isCompleted: false,
    },
    {
      title: 'Start work in HCS',
      isCompleted: false,
    },
  ];
  const length = await Todo.count();
  if (length === 0) {
    console.log('--------------- CREATE TODOS -------------');
    Todo.create(todos);
  }
};

if (useMocks) {
  createMockTodos();
}

export const create = cage(async ({ body }, res) => res.send(await Todo.create(body)));

export const read = cage(async ({ params }, res) => res.send(await Todo.findById(params.id)));

export const update = cage(async ({ params, body }, res) =>
  res.send(await Todo.findByIdAndUpdate(params.id, body)));

export const remove = cage(async ({ params }, res) =>
  res.send(await Todo.findByIdAndRemove(params.id)));

export const all = cage(async ({ query }, res) => {
  const q = Object.keys(query).length ? Todo.find(query) : Todo.find();
  res.send(await q.exec());
});

export const findAllByUser = cage(async ({ params }, res) =>
  res.send(await Todo.find({ userId: params.id })));
