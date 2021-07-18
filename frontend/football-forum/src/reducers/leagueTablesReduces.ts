import * as types from '../@types/leagueTablesTypes';
import { LEGAUE_TABLES_FAIL, LEGAUE_TABLES_REQUEST, LEGAUE_TABLES_SUCCESS } from '../constants/leagueTablesConstants';

const initialState: types.LeagueTablesState = {
    table: null,
    loading: true,
    error: null
}

export const getLeagueTablesReducer = (state: types.LeagueTablesState = initialState, action: types.LeagueTablesAction): types.LeagueTablesState => {
    switch (action.type) {
        case LEGAUE_TABLES_REQUEST:
            return { ...state, loading: true, error: null };
        case LEGAUE_TABLES_SUCCESS:
            return { ...state, loading: false, table: action.payload};
        case LEGAUE_TABLES_FAIL:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}