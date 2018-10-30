import Todo from './model';
import { useMocks } from '../../config';
import { cage } from '../../utils';

/**
 * @module Todos/Controller
 */

/**
 * Creates default todo list for first db initialization
 */
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
  const length = await Todo.countDocuments();
  if (length === 0) {
    console.log('--------------- CREATE TODOS -------------');
    Todo.create(todos);
  }
};

if (useMocks) {
  createMockTodos();
}

/**
 * Creates todo user
 * @method create
 * @param {String} req.body.title - task description
 * @param {Boolean} req.body.isCompleted
 * @param {String} req.body.userId - user hash id
 * @memberof Todos/Controller
 */
export const create = cage(async ({ body }, res) => res.send(await Todo.create(body)));

/**
 * Get todo by userId
 * @method read
 * @param {String} req.params.id - task hash id
 * @memberof Todos/Controller
 */
export const read = cage(async ({ params }, res) => res.send(await Todo.findById(params.id)));

/**
 * Get todo by userId
 * @method update
 * @param {String} req.params.id - task hash id
 * @param {String} req.body.title - task description
 * @param {Boolean} req.body.isCompleted
 * @param {String} req.body.userId - user hash id
 * @memberof Todos/Controller
 */
export const update = cage(async ({ params, body }, res) =>
  res.send(await Todo.findByIdAndUpdate(params.id, body)));

/**
 * delete todo by userId
 * @method remove
 * @param {String} req.params.id - user hash id
 * @memberof Todos/Controller
 */
export const remove = cage(async ({ params }, res) =>
  res.send(await Todo.findByIdAndRemove(params.id)));

/**
 * Get all todos by filter
 * @method all
 * @param {Object} req.query - filter queries
 * @memberof Todos/Controller
 */
export const all = cage(async ({ query }, res) => {
  const q = Object.keys(query).length ? Todo.find(query) : Todo.find();
  res.send(await q.exec());
});

/**
 * Find all todos by userId
 * @method findAllByUser
 * @param {String} req.params.id - user hash id
 * @memberof Todos/Controller
 */
export const findAllByUser = cage(async ({ params }, res) =>
  res.send(await Todo.find({ userId: params.id })));

export default {
  create,
  read,
  update,
  remove,
  all,
  findAllByUser,
};
