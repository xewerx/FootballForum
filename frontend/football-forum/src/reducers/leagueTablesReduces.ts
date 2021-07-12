import * as types from '../@types/leagueTablesTypes';
import { LEGAUE_TABLES_FAIL, LEGAUE_TABLES_REQUEST, LEGAUE_TABLES_SUCCESS } from '../constants/leagueTablesConstants';

const initialState = {
    table: null,
    loading: true,
    error: "Brak danych"
}

export const getLeagueTablesReducer = (state: types.LeagueTablesState = initialState, action: types.LeagueTablesAction) => {
    switch (action.type) {
        case LEGAUE_TABLES_REQUEST:
            return { loading: true, error: null };
        case LEGAUE_TABLES_SUCCESS:
            return { loading: false, table: action.payload };
        case LEGAUE_TABLES_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}