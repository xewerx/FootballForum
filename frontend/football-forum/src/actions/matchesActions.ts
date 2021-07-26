import axios from 'axios';
import { MATCHES_REQUEST, MATCHES_SUCCESS, MATCHES_FAIL } from '../constants/matchesConstants';
import * as types from '../@types/matchesTypes'

export const getMatches = (leagueID: number) => async (dispatch: types.DispatchType) => {
    dispatch({ type: MATCHES_REQUEST });
    const currentDate: Date = new Date();
    try {
        const { data: { response } }: {data: {response: types.MatchesAPIResponse[]}} = await axios.get(`https://v3.football.api-sports.io/fixtures?date=${currentDate.toISOString().slice(0,10)}&league=${leagueID}&season=${currentDate.getFullYear()}`, {
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-apisports-key': '813cd9c0be7cfbbf95409292c1fe3bef'
            }
        });
        console.log(response)
        dispatch({ type: MATCHES_SUCCESS, payload: response });
    } catch (error) {
        dispatch({ type: MATCHES_FAIL, error: error.message });
    }
};

