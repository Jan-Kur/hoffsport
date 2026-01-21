import { supabase } from "../supabase"

export type StatsData = {
  overall : {
    hoffscore: number
    totalMatches: number
    winRate: number
    bestLeague: string
  }
  HBL: {
    wins: number
    losses: number
    ties: number
    stageReached: string
    maxPoints: number
    avgPoints: number
  }
  HVL: {
    wins: number
    losses: number
    ties: number
    stageReached: string
    maxPoints: number
    avgPoints: number
  }
  HLK: {
    wins: number
    losses: number
    ties: number
    stageReached: string
    maxPoints: number
    avgPoints: number
  }
}

export async function fetchProfile(userId: string) {
  try {
    const {data, error} = await supabase
      .from("profiles")
      .select("full_name, grade, email")
      .eq("id", userId)
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.log(error)
  }
}

export async function fetchStats(userId: string) {
  try {
    const { data: teams, error: teamsError } = await supabase
      .from("team_seasons")
      .select(`
        id,
        team_season_players!inner ()
      `)
      .eq("team_season_players.user_id", userId)

    if (teamsError) throw teamsError

    const teamSeasonIds = teams.map(team => team.id)
    const {data: matches, error: matchesError} = await supabase
      .from("matches")
      .select(`
        score_a, 
        score_b, 
        team_season_a:team_seasons!team_season_a_id (
          id,
          stage_reached,
          groups (
            leagues (
              name
            ) 
          )
        ),
        team_season_b:team_seasons!team_season_b_id (
          id,
          stage_reached
        )
      `)
      .or(`team_season_a_id.in.(${teamSeasonIds.join(",")}),team_season_b_id.in.(${teamSeasonIds.join(",")})`)

    if (matchesError) throw matchesError

    return calculateStats(matches, teamSeasonIds)

  } catch (error) {
    console.log(error) 
  }
}

function calculateStats(
  matches: {
    score_a: number
    score_b: number
    team_season_a: {
      id: string
      stage_reached: string
      groups: {
        leagues: {
          name: string
        }
      }
    }
    team_season_b: {
      id: string
      stage_reached: string
    }
  }[], 
  teamIds: string[]) {
  const stats = {
    overall: { hoffscore: 0, totalMatches: 0, winRate: 0, bestLeague: "" },
    HBL: { wins: 0, losses: 0, ties: 0, maxPoints: 0, avgPoints: 0, stageReached: "Brak" },
    HVL: { wins: 0, losses: 0, ties: 0, maxPoints: 0, avgPoints: 0, stageReached: "Brak" },
    HLK: { wins: 0, losses: 0, ties: 0, maxPoints: 0, avgPoints: 0, stageReached: "Brak" }
  }

  let totalWins = 0
  let totalMatches = 0
  const totalPoints = {
    HBL: 0,
    HVL: 0,
    HLK: 0
  }

  matches.forEach(match => {
    const isTeamA = teamIds.includes(match.team_season_a.id)
    const userScore = isTeamA ? match.score_a : match.score_b
    const opponentScore = isTeamA ? match.score_b : match.score_a
    const leagueName = match.team_season_a.groups.leagues.name
    const stageReached = isTeamA ? match.team_season_a.stage_reached : match.team_season_b.stage_reached

    totalMatches++
    totalWins = userScore > opponentScore ? totalWins + 1 : totalWins

    if (leagueName in stats) {
      if (userScore > opponentScore) {
        stats[leagueName].wins++
      } else if (userScore < opponentScore) {
        stats[leagueName].losses++
      } else {
        stats[leagueName].ties++
      }

      stats[leagueName].maxPoints = Math.max(stats[leagueName].maxPoints, userScore)
      totalPoints[leagueName] += userScore
      stats[leagueName].stageReached = stageReached
    }
  })

  Object.keys(totalPoints).forEach(league => {
    const leagueMatches = stats[league].wins + stats[league].ties + stats[league].losses
    if (leagueMatches === 0) {
      stats[league].avgPoints = 0
    } else {
      stats[league].avgPoints = Math.round((totalPoints[league]/leagueMatches) * 10) / 10 
    }
  })

  stats.overall.totalMatches = totalMatches
  stats.overall.winRate = Math.round((totalWins / totalMatches) * 100)
  stats.overall.bestLeague = calculateBestLeague(stats)
  stats.overall.hoffscore = Math.round(calculateHoffscore(stats))

  return stats
}

export function getInitials(full_name: string) {
  const parts = full_name.split(" ")

  if (parts[1]) {
    return parts[0].charAt(0)+parts[1].charAt(0)
  } else {
    return parts[0].charAt(0)
  } 
}

export function getStats(type : keyof StatsData, data: StatsData) {
  if (type === 'overall') {
    return [
      [
        { label: "Hoffscore", value: data.overall.hoffscore },
        { label: "Rozegrane mecze", value: data.overall.totalMatches }
      ],
      [
        { label: "Wygrane", value: `${data.overall.winRate}%` },
        { label: "Najlepsza liga", value: data.overall.bestLeague }
      ]
    ];
  }
  
  return [
    [
      { label: "Wygrane", value: data[type].wins, color: "text-green-600 dark:text-green-500" },
      { label: "Przegrane", value: data[type].losses, color: "text-red-600 dark:text-red-500" },
      { label: "Remisy", value: data[type].ties, color: "text-gray-600 dark:text-gray-400" }
    ],
    [
      { label: "Najdalszy etap", value: data[type].stageReached },
      { label: "Najwięcej punktów", value: data[type].maxPoints },
      { label: "Średnia punktów", value: data[type].avgPoints, color: "text-main-light dark:text-main" }
    ]
  ]
}

function calculateBestLeague(stats: StatsData) {
  const getLeagueScore = (league: string) => {
    const totalMatches = stats[league].wins + stats[league].losses + stats[league].ties
    const score = (stats[league].wins * 50) + (stats[league].ties * 20) + (stats[league].losses * 10)
    return totalMatches > 0 ? score / totalMatches : 0
  }

  const scores = {
    HBL: getLeagueScore("HBL"),
    HVL: getLeagueScore("HVL"),
    HLK: getLeagueScore("HLK")
  }

  if (Math.max(scores.HBL, scores.HVL, scores.HLK) === 0) {
    return 
  }

  return Object.keys(scores).reduce((best, league) => 
    scores[league] > scores[best] ? league : best
  )
}

function calculateHoffscore(stats: StatsData) {
  const totalWins = stats.HBL.wins + stats.HLK.wins + stats.HVL.wins
  const totalTies = stats.HBL.ties + stats.HLK.ties + stats.HVL.ties
  const totalLosses = stats.HBL.losses + stats.HLK.losses + stats.HVL.losses

  const hoffscore = ((totalWins * 50) + (totalTies * 20) + (totalLosses * 10)) + (stats.overall.winRate * 2)

  return hoffscore
}

