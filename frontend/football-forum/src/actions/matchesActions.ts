import axios from 'axios';
import { MATCHES_REQUEST, MATCHES_SUCCESS, MATCHES_FAIL } from '../constants/matchesConstants';
import * as types from '../@types/matchesTypes'

export const getMatches = (ID: number) => async (dispatch: types.DispatchType) => {
    dispatch({ type: MATCHES_REQUEST });
    try {
        const { data }: {data: {response: types.MatchesAPIResponse}} = await axios.get(`https://v3.football.api-sports.io/fixtures?live=all&league=667`, {
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-apisports-key': '813cd9c0be7cfbbf95409292c1fe3bef'
            }
        });
        console.log(data)
        const ligueTables: types.MatchesAPIResponse = data.response;
        dispatch({ type: MATCHES_SUCCESS, payload: ligueTables });
    } catch (error) {
        dispatch({ type: MATCHES_FAIL, error: error.message });
    }
}