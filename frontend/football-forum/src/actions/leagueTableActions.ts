import axios from 'axios';
import { LEGAUE_TABLES_FAIL, LEGAUE_TABLES_REQUEST, LEGAUE_TABLES_SUCCESS } from '../constants/leagueTablesConstants';
import * as types from "../@types/leagueTablesTypes";

export const getLeagueTable = (ID: number) => async (dispatch: types.DispatchType) => {
    dispatch({ type: LEGAUE_TABLES_REQUEST });
    try {
        const currentYear: number = new Date().getFullYear();
        console.log(currentYear)
        const { data }: {data: {response: types.FootballAPIResponse[]}} = await axios.get(`https://v3.football.api-sports.io/standings?league=${ID}&season=${currentYear}`, {
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-apisports-key': '813cd9c0be7cfbbf95409292c1fe3bef'
            }
        });
        const ligueTables: types.FootballAPIResponse = data.response[0];
        dispatch({ type: LEGAUE_TABLES_SUCCESS, payload: ligueTables });
    } catch (error) {
        dispatch({ type: LEGAUE_TABLES_FAIL, payload: error.message });
    }
}