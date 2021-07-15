import * as memesTypes from './memesTypes';
import * as userTypes from './userTypes';
import * as leagueTablesTypes from './leagueTablesTypes';

type stateType = {
    memes: memesTypes.MemState
    uploadMem: memesTypes.UploadMemState
    userSignin: userTypes.UserState,
    userRegister: userTypes.UserState,
    leagueTable: leagueTablesTypes.LeagueTablesState  
}

export default stateType;