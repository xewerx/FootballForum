import { createStore, compose, applyMiddleware, combineReducers, Store } from 'redux';
import thunk from 'redux-thunk';

import { getLeagueTablesReducer } from './reducers/leagueTablesReducer';
import { getAndAcceptOrDiscardMemesReducer, uploadMemReducer } from './reducers/memesReducer';
import { signinReducer, registerReducer, editProfileReducer } from './reducers/userReducer';
import stateType from './@types/globaStateType';
import { matchesReducer } from './reducers/matchesReducer';

const rootReducer = combineReducers<stateType>({
    memes: getAndAcceptOrDiscardMemesReducer,
    uploadMem: uploadMemReducer,
    userSignin: signinReducer,
    userRegister: registerReducer,
    userEdit: editProfileReducer,
    leagueTable: getLeagueTablesReducer,
    matches: matchesReducer
});

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;  // extension z przegladarki do reduxa

const store: Store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;