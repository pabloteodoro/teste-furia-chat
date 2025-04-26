"use client"

import { useEffect, useState } from "react"

interface Match {
  id: number
  event: { name: string }
  team1: { name: string }
  team2: { name: string }
  date: number
}

export default function UpcomingMatches() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("/api/matches")
        const data = await res.json()
        setMatches(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])

  if (loading) return <p>Carregando partidas...</p>

  return (
    <div className="mt-12 w-full max-w-4xl bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-black text-center">Próximos Jogos 🎯</h2>
      {matches.length === 0 ? (
        <p className="text-black text-center">Nenhum jogo encontrado!</p>
      ) : (
        <ul className="space-y-4">
          {matches.map((match) => (
            <li key={match.id} className="border-b pb-4 last:border-b-0">
              <p className="text-black text-lg font-semibold">
                {match.team1.name} 🆚 {match.team2.name}
              </p>
              <p className="text-gray-600">{match.event?.name}</p>
              <p className="text-gray-600">{new Date(match.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
