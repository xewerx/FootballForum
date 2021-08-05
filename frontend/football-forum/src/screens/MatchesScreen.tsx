import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import stateType from '../@types/globaStateType';
import MessageBox from '../components/MessageBox/MessageBox';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import { getMatches } from '../actions/matchesActions';

const MatchesScreen: React.FC = () => {

    const dispatch = useDispatch();

    const matchesState = useSelector((state: stateType) => state.matches);
    const { loading, error, matches } = matchesState;

    const selectedButton = document.querySelector('.button-selected');
    const selectLeagueTable = (e: React.MouseEvent<any>, ID: number) => {
        const newSelectButton: any = e.target;
        newSelectButton.classList.add("button-selected");
        selectedButton?.classList.remove("button-selected");
        dispatch(getMatches(ID))
    }

    useEffect(() => {
        dispatch(getMatches(39));
    }, [dispatch])

    // ID for API
    // PremierLeagueId = 39
    // LaLigaId = 140
    // SerieAId = 135
    // BundesligaId = 78
    // Ligue1Id = 61
    // EkstraklasaId = 106

    return (
        <div className="screen-container">
            <div className='table'>
                <h2>Dzisiejsze mecze</h2>
                <div className="table-buttons-container">
                    <button className="block button-selected" onClick={(e) => selectLeagueTable(e, 39)}>Premier League</button>
                    <button className="block" onClick={(e) => selectLeagueTable(e, 140)}>La Liga</button>
                    <button className="block" onClick={(e) => selectLeagueTable(e, 135)}>Serie A</button>
                    <button className="block" onClick={(e) => selectLeagueTable(e, 78)}>Bundesliga</button>
                    <button className="block" onClick={(e) => selectLeagueTable(e, 61)}>Ligue 1</button>
                    <button className="block" onClick={(e) => selectLeagueTable(e, 106)}>Ekstraklasa</button>
                </div>
                {
                    loading ? <LoadingBox></LoadingBox>
                        :
                        error ? <MessageBox variant="danger">{error}</MessageBox>
                            :
                            <div>

                                {matches?.length ?
                                    <table className="content-table">
                                        <tbody>
                                            {
                                                matches.map(match => (
                                                    <tr key={match.fixture.id}>
                                                        <img className="team-logo" src={match.teams.home.logo} alt="logo"></img>
                                                        <td>{match.teams.home.name}</td>
                                                        <td>{match.goals.home}</td>
                                                        <td>-</td>
                                                        <td>{match.goals.away}</td>
                                                        <img className="team-logo" src={match.teams.away.logo} alt="logo"></img>
                                                        <td>{match.teams.away.name}</td>
                                                        {
                                                            match.fixture.status.short === "FT" ?
                                                                <td>FT</td>
                                                                :
                                                                match.fixture.status.short === "TBD" || match.fixture.status.short === "NS" ?
                                                                    <td>{match.fixture.date.slice(11, 16)}</td>
                                                                    :
                                                                    <td>{match.fixture.status.elapsed}'</td>
                                                        }
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    :
                                    <p>W tej lidze dzisiaj nie ma meczy</p>
                                }


                            </div>
                }
            </div>
        </div>
    )
}

export default MatchesScreen;