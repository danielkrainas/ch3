import { createStore, applyMiddleware } from 'redux';

import { logging } from './middleware';
import { reducer, initialState } from './reducers';

const middleware = applyMiddleware();

export default createStore(reducer, initialState, middleware);
