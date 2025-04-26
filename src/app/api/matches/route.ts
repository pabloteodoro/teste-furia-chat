import { NextResponse } from "next/server"

export interface Match {
  id: number
  team1: { name: string }
  team2: { name: string }
  event: { name: string }
  date: string
}

export async function GET() {
  try {
    const mockMatches: Match[] = [
      {
        id: 1,
        team1: { name: "FURIA" },
        team2: { name: "Team Liquid" },
        event: { name: "IEM Katowice 2025" },
        date: new Date().toISOString(),
      },
      {
        id: 2,
        team1: { name: "FURIA" },
        team2: { name: "NAVI" },
        event: { name: "BLAST Premier" },
        date: new Date(Date.now() + 86400000).toISOString(),
      },
    ]

 
    const furiaMatches = mockMatches.filter(
      (match) =>
        match.team1?.name.includes("FURIA") || match.team2?.name.includes("FURIA")
    )

    return NextResponse.json(furiaMatches.slice(0, 5))
  } catch (error) {
    console.error("Error fetching matches:", error)
    return NextResponse.error()
  }
}
