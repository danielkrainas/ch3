import { createStore, applyMiddleware } from 'redux';

import { logging } from './middleware';
import { reducer, initialState } from './reducers';

const middleware = applyMiddleware();

export * from './selectors';
export * from './actions';
export default createStore(reducer, initialState, middleware);
