import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import header from './header';
import notes from './notes';

const stores = { header, notes };
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({ ...stores }),
    composeEnhancers(applyMiddleware(thunk))
);

export { store };
