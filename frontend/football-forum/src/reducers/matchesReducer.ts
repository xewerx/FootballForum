import * as types from '../@types/matchesTypes'
import { MATCHES_FAIL, MATCHES_REQUEST, MATCHES_SUCCESS } from '../constants/matchesConstants';

const IMatchesState: types.MatchesState = {
    matches: null,
    loading: false,
    error: null
};

export const matchesReducer = (state: types.MatchesState = IMatchesState, action: types.MatchesAction): types.MatchesState => {
    switch(action.type) {
        case MATCHES_REQUEST:
            return {...state, loading: true};
        case MATCHES_SUCCESS:
            return {...state, loading: false, matches: action.payload};
        case MATCHES_FAIL:
            return {...state, loading: false, error: action.error};
        default:
            return state;
    }
};