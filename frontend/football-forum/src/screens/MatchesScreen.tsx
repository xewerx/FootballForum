import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import stateType from '../@types/globaStateType';
import MessageBox from '../components/MessageBox/MessageBox';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import { getMatches } from '../actions/matchesActions';

const MatchesScreen: React.FC = () => {

    const dispatch = useDispatch();

    const leagueTable = useSelector((state: stateType) => state.leagueTable);
    const { loading, error } = leagueTable;

    useEffect(() => {
        dispatch(getMatches(2));
    }, [dispatch])

    // ID for API
    // PremierLeagueId = 39
    // LaLigaId = 140
    // SerieAId = 135
    // BundesligaId = 78
    // Ligue1Id = 61
    // EkstraklasaId = 106

    return (
        loading ? <LoadingBox></LoadingBox>
            :
            error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                <h2>Premier League</h2>

    )
}

export default MatchesScreen;