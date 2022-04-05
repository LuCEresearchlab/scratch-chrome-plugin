const compose = (...args) => {
  if (args.length === 0) return (...internalArgs) => internalArgs;
  return (...internalArgs) => args.reverse().reduce((acc, fn) => {
    if (acc) {
      return fn(acc);
    }
    return fn(...internalArgs);
  }, null);
};

const apply = (...middlewareArray) => (createStore) => (...createStoreArgs) => {
  const store = createStore(...createStoreArgs);
  const initialized = middlewareArray.map((middleware) => middleware({
    getState: store.getState,
    dispatch: (dispatchAction) => store.dispatch(dispatchAction),
  }));
  store.dispatch = compose(...initialized)(store.dispatch);
  return {
    ...store,
    dispatch: store.dispatch,
  };
};

(() => {
  // Append our store to the window object
  window.ScratchStore = {};

  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = (...args) => {
    const middleware = ({ getState, dispatch }) => {
      // get dispatch and getState from middleware
      window.ScratchStore.dispatch = dispatch;
      window.ScratchStore.getState = getState;

      // Go to next action
      return (next) => (action) => {
        const nextReturn = next(action);
        return nextReturn;
      };
    };

    const newArgs = [...args, apply(middleware)];
    return compose(...newArgs);
  };
})();
