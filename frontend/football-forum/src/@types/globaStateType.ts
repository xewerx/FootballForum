import * as memesTypes from './memesTypes';
import * as leagueTablesTypes from './leagueTablesTypes';

type stateType = {
    memes: {
        memes: memesTypes.Mem[],
        loading: boolean
        error: string | null
    }
    userSignin: {
        userInfo: {
            _id: string
            name: string
            email: string
            isAdmin: boolean
            token: string
        }
        loading: Boolean
        error: string | null
    },
    userRegister: {
        userInfo: {
            _id: string
            name: string
            email: string
            isAdmin: boolean
            token: string
        }
        loading: boolean
        error: string | null
    },
    leagueTable: {
        table: leagueTablesTypes.FootballAPIResponse
        loading: boolean
        error: string | null
    }
}

export default stateType;