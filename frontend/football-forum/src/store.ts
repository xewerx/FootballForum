import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { getMemesReducer } from './reducers/memesReducer';

const initialState = {};

const rootReducer = combineReducers({
    memes: getMemesReducer
});

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;  // extension z przegladarki do reduxa

const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;