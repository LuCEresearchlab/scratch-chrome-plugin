import injectedAppInitialState from './initialStates/pageAppInitialState.js';

import modalActions from './actions/modalActions.js';
import modalReducers from './reducers/modalReducers.js';

import diagramActions from './actions/diagramActions.js';
import diagramReducers from './reducers/diagramReducers.js';

export const reducers = {
  ...modalReducers,
  ...diagramReducers,
};

export const actions = [
  ...modalActions,
  ...diagramActions,
];

export function reducer(state, action) {
  const { type, payload } = action;

  if (!(type in reducers)) throw new Error(`Unknown action: ${type}, ${payload}`);
  return reducers[type](state, payload);
}

export const createDispatchActions = (dispatch) => actions.reduce((accumulator, item) => {
  accumulator[item.name] = (payload) => {
    dispatch(item.action(payload));
  };
  return accumulator;
}, {});

export const initialState = injectedAppInitialState;
