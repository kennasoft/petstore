import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';

const middleWare = applyMiddleware(thunk, promise(), createLogger());

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, middleWare);
}