import { Database } from "../database.types"
import { supabase } from "../supabase"

type team = {
  name: string
}

export type Match = Omit<Database['public']['Tables']['matches']['Row'], "team1" | "team2"> & {
  team1: team
  team2: team
}

export type Break = {
  id: string
  date: Date
  matches: Match[]
}

export type Filter = "past" | "today" | "upcoming" | null

export type AdvancedFilters = {
  timeframe?: {start: string, end: string}
  teams?: string[]
  league?: string
  stage?: string
}

export async function fetchMatches(
  filter: Filter, 
  advFilters: AdvancedFilters, 
  setMatches: React.Dispatch<React.SetStateAction<Break[]>>
) {
  try {
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
    const endOfDay = new Date(new Date().setHours(23, 59, 59, 999)).toISOString()

    let finalStart: string | null = null
    let finalEnd: string | null = null

    if (filter === "past") {
      finalEnd = startOfDay
    } else if (filter === "today") {
      finalStart = startOfDay
      finalEnd = endOfDay
    } else if (filter === "upcoming") {
      finalStart = endOfDay
    }
    
    if (advFilters.timeframe) {
      const { start, end } = advFilters.timeframe
      
      if (finalStart && start) {
        finalStart = finalStart > start ? finalStart : start
      } else if (start) {
        finalStart = start
      }
      
      if (finalEnd && end) {
        finalEnd = finalEnd < end ? finalEnd : end
      } else if (end) {
        finalEnd = end
      }
    }

    let query = supabase
      .from("matches")
      .select('id,timestamp,score1,score2,stage,league,place,team1(name),team2(name)')
      .order("timestamp", {ascending: true})
      .limit(100)

    if (finalStart) query = query.gte("timestamp", finalStart)
    if (finalEnd) query = query.lte("timestamp", finalEnd)

    if (advFilters.teams && advFilters.teams.length > 0) {
      const teams = advFilters.teams.join(",")
      query = query.or(`team1.in.(${teams}),team2.in.(${teams})`)
    }

    if (advFilters.league) {
      query = query.eq("league", advFilters.league)
    }

    if (advFilters.stage) {
      query = query.eq("stage", advFilters.stage)
    }
    
    const {data, error} = await query.overrideTypes<Match[], { merge: false }>()
    
    if (error) throw error

    setMatches(groupMatchesByBreak(data))
  } catch (error) {
    console.log(error)//TODO
  }
}

export function groupMatchesByBreak(matches: Match[]) : Break[] {
  const groups = new Map<string, Match[]>()

  matches.forEach(match => {
    const key = match.timestamp

    if (!groups.has(key)) {
      groups.set(key, [])
    }
    groups.get(key)!.push(match)
  }) 

  return Array.from(groups.entries()).map(([timestamp, matches]) => {
    return {
      id: timestamp,
      date: new Date(timestamp),
      matches
    }
  })
}