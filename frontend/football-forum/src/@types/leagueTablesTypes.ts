export interface FootballAPIResponse {
    league: {
        id: number
        name: string
        country: string
        logo: string
        flag: string
        season: number
        standings:       
                {
                    rank: number
                    team: {
                        id: number
                        name: string
                        logo: string
                    },
                    points: number
                    goalsDiff: number
                    group: string
                    form: string
                    status: string
                    description: string
                    all: {
                        played: number
                        win: number
                        draw: number
                        lose: number
                        goals: {
                            for: number
                            against: number
                        }
                    },
                    home: {
                        played: number
                        win: number
                        draw: number
                        lose: number
                        goals: {
                            for: number
                            against: number
                        }
                    },
                    away: {
                        played: number
                        win: number
                        draw: number
                        lose: number
                        goals: {
                            for: number
                            against: number
                        }
                    },
                    update: string
                }[][]     
    }
}

export interface LeagueTablesState {
    table: FootballAPIResponse
    loading: boolean
    error?: string | null
}

export type LeagueTablesAction = {
        type: string
        payload: FootballAPIResponse
        error?: string
    }

export type DispatchType = (args: LeagueTablesAction) => LeagueTablesAction