import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

// enhancer implementing so that not only object can be dispatched as action 
// but a string too --- MONKEY PATCHING!
const stringEnhancer = (createStore) => (...args) => {
  const store = createStore(...args);
  const originalDispatch = store.dispatch;
  store.dispatch = (action) => {
    if (typeof action === 'string') {
      return originalDispatch({
        type: action
      })
    }
    return originalDispatch(action);
  }
  return store
}

// another enhancer with monkey patching
const logEnhancer = (createStore) => (...args) => {
  const store = createStore(...args);
  const originalDispatch = store.dispatch;
  store.dispatch = (action) => {
    console.log(action.type);
    return originalDispatch(action);
  }
  return store
}

// next here as dispatch
const logMiddleware = ({ getState }) => (next) => (action) => {
  console.log(action.type, store.getState());
  return next(action)
}

// next here as dispatch
const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    })
  }
  return next(action)
}

const store = createStore(reducer, applyMiddleware(
  thunk, stringMiddleware, logMiddleware
  )
);

const delayedActionCreator = (timeout) => (dispatch) => {
  setTimeout(() => dispatch({
    type: 'DELAYED_ACTION'
  }), timeout)
}

store.dispatch(delayedActionCreator(3000));

store.dispatch('hello world');

export default store