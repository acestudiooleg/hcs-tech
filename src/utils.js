export const logger = (acts) => {
  const actions = {};
  Object.keys(acts).forEach((act) => {
    actions[act] = function r(...rest) {
      console.log('ACTION:', act);
      console.log('DATA:', rest[1]);
      console.log('===========================================');
      return acts[act](...rest);
    };
  });
  return { actions };
};

export const each = iterator => (obj = {}) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[key] = iterator(obj[key], key);
  });
  return newObj;
};

/**
 * Creates proxy for action and call mutations
 * @example
 * actionsToMutationsMap({logout: 'removeUser'});
 * // { logout: ({commit}, payload) => commit('removeUser', payload) }
 * @param {Object} actionsNamesObject - actions
 * @return {Object} actions with mutations proxy
 */
export const actionsToMutationsMap = (actionsNamesObject = {}) => {
  const actionToMutation = each(mutationName => ({ commit }, payload) =>
    commit(mutationName, payload));
  return actionToMutation(actionsNamesObject);
};

/**
 * Convert array of arrays to object bay pair
 * @example
 * fromArrayToObject([['hello', 'world'], ['name', 'peter']]);
 * // { hello: 'world', name: 'peter' };
 * @param {Array} array
 * @returns {Object}
 */
export const fromArrayToObject = (array = []) => {
  if (array instanceof Array) {
    const obj = {};
    array.forEach(([key, value]) => {
      obj[key] = value;
    });
    return obj;
  }

  return array;
};

/**
 * Update item in list from state
 * @example
 * const users = {
 *  articles: [{ id: 1, title: 'hello'}, {id: 2, title: 'world'}]
 * }
 *
 * //mutations
 * const changeArticles = createMethodChangeItemInList('articles');
 *
 * export default [
 *   ['changeTitle',
 *    changeArticles(article, payload) => ({ title: (article.title + payload.title) }))
 *  ]
 * ]
 *
 * //actions
 * {
 *  changeTitle({commit}){
 *    commit('changeTitle', {id: 2, title: '222'});
 *  }
 * }
 *
 * //users now
 * const users = {
 *  articles: [{ id: 1, title: 'hello'}, {id: 2, title: 'world222'}]
 * }
 * @param {String} arrayName
 * @param {Function} iterator - update object (item, payload, state)
 * @param {String} criteria - [id]
 */
export const createMethodChangeItemInList = (arrayName = 'list') => (iterator, criteria = 'id') => (
  state,
  payload,
) => {
  const newState = { ...state };
  newState[arrayName] = state[arrayName].map((el) => {
    const x = payload instanceof Object ? payload[criteria] : payload;
    if (el[criteria] === x) {
      const result = iterator(el, payload, state);
      return { ...el, ...result };
    }
    return el;
  });
};

/**
 * Transform mutations
 * @example
 * const mutations = {
 *  changeName: (state, newName) => ({name: newName}),
 *  resetCounter: () => ({counter: 0}),
 * };
 * transformMutations(mutations);
 * //mutations now

 * mutations: {
 *   changeName(state, newName) {
 *     state.name = newName;
 *   },
 *   resetCounter(state){
 *     state.counter = 0;
 *   }
 * }

 *
 */
export const transformMutations = each(mutation => (state, payload) => {
  const newState = { ...state };
  const result = mutation(state, payload);
  if (result) {
    if (state instanceof Array) {
      state.splice(0, state.length);
    }
    each((x, key) => {
      newState[key] = x;
    })(result);
  }
});

/**
 * Transform mutations using pure methods in array structure
 * @example
 * const mutations = [
 *  ['changeName', (state, newName) => ({name: newName})]
 *  ['resetCounter', () => ({counter: 0})]
 * ];
 * const modules = {
 *  users: {
 *    mutations
 *  }
 * }
 * pureMutation(modules);
 * //modules now
 * modules = {
 *   users: {
 *     mutations: {
 *       changeName(state, newName) {
 *         state.name = newName;
 *       },
 *       resetCounter(state){
 *         state.counter = 0;
 *       }
 *     }
 *   }
 * }
 *
 */
export const pureMutation = each((moduleObject) => {
  const newModule = { ...moduleObject };
  newModule.mutations = transformMutations(fromArrayToObject(newModule.mutations));
  return newModule;
});

export default {
  logger,
  actionsToMutationsMap,
  pureMutation,
  each,
  fromArrayToObject,
  createMethodChangeItemInList,
  transformMutations,
};
