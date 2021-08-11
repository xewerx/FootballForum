import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLeagueTable } from '../actions/leagueTableActions';
//import { data } from '../assets/sampleData';
import stateType from '../@types/globaStateType';
import MessageBox from '../components/MessageBox/MessageBox';
import LoadingBox from '../components/LoadingBox/LoadingBox';

const TablesScreen: React.FC = () => {

    const selectedButton: HTMLElement = document.querySelector('.button-selected')!;

    const dispatch = useDispatch();
    const selectLeagueTable = (e: React.MouseEvent<any>, ID: number) => {
        const newSelectButton: any = e.target;
        newSelectButton.classList.add("button-selected");
        selectedButton?.classList.remove("button-selected");
        dispatch(getLeagueTable(ID))
    }

    const leagueTable = useSelector((state: stateType) => state.leagueTable);
    const { loading, table, error } = leagueTable;

    useEffect(() => {
        dispatch(getLeagueTable(39));
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
            <div className="table">
                <div className="caption">
                    <h2>Tabele ligowe</h2>
                </div>
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
                            <div className="scroll-x">
                                <table className="content-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th></th>
                                            <th>Druzyna</th>
                                            <th>M</th>
                                            <th>PKT</th>
                                            <th>Z</th>
                                            <th>R</th>
                                            <th>P</th>
                                            <th>BR</th>
                                            <th>+/-</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table ?
                                            table.league.standings[0].map(team => (  //nigdy nie bedzie nullem 
                                                <tr key={team.team.id}>
                                                    <td>{team.rank}</td>
                                                    <td className="td-logo"><img className="team-logo" src={team.team.logo} alt="logo"></img></td>
                                                    <td>{team.team.name}</td>
                                                    <td>{team.all.played}</td>
                                                    <td>{team.points}</td>
                                                    <td>{team.all.win}</td>
                                                    <td>{team.all.draw}</td>
                                                    <td>{team.all.lose}</td>
                                                    <td>{team.all.goals.for}</td>
                                                    <td>{team.all.goals.for - team.all.goals.against}</td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                }
            </div>
        </div>
    )
}

export default TablesScreen;