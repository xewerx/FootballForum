export interface MatchesAPIResponse {
        fixture: {
            id: number
            referee: string
            timezone: string
            date: string
            timestamp: number
            periods: {
                first: number
                second: number
            }
            venue: {
                id: number
                name: string
                city: string
            }
            status: {
                long: string
                short: string
                elapsed: number
            }
        }
        league: {
            id: number
            name: string
            country: string
            logo: string
            flag: null
            season: number
            round: string
        }
        teams: {
            home: {
                id: number
                name: string
                logo: string
                winner: string | null
            }
            away: {
                id: number
                name: string
                logo: string
                winner: string | null
            }
        }
        goals: {
            home: number | null
            away: number | null
        }
        score: {
            halftime: {
                home: number | null
                away: number | null
            }
            fulltime: {
                home: number | null
                away: number | null
            }
            extratime: {
                home: number | null
                away: number | null
            }
            penalty: {
                home: number | null
                away: number | null
            }
        }
}


export interface MatchesState {
    matches?: MatchesAPIResponse[] | null
    loading: boolean
    error?: string | null
}

export type MatchesAction = {
        type: string
        payload?: MatchesAPIResponse[] | null
        error?: string
    }

export type DispatchType = (args: MatchesAction) => MatchesAction