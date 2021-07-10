import { createStore, compose, applyMiddleware, combineReducers, Store } from 'redux';
import thunk from 'redux-thunk';

import { getMemesReducer } from './reducers/memesReducer';
import { signinReducer, registerReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
    memes: getMemesReducer,
    userSignin: signinReducer,
    userRegister: registerReducer
});

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;  // extension z przegladarki do reduxa

const store: Store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;