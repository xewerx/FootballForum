import * as memesTypes from './memesTypes';
import * as userTypes from './userTypes';
import * as leagueTablesTypes from './leagueTablesTypes';
import * as matchesTypes from './matchesTypes';

interface stateType  {
    memes: memesTypes.MemState
    uploadMem: memesTypes.UploadMemState
    userSignin: userTypes.UserState
    userRegister: userTypes.UserState
    userEdit: userTypes.EditUserState
    leagueTable: leagueTablesTypes.LeagueTablesState 
    matches: matchesTypes.MatchesState
}

export default stateType;