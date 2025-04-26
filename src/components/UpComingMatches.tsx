"use client"

export default function UpcomingMatches() {

  const matches = [
    {
      id: 1,
      opponent: "NAVI",
      date: "2025-04-30",
      time: "16:00",
      tournament: "BLAST Premier Spring",
    },
    {
      id: 2,
      opponent: "FaZe Clan",
      date: "2025-05-02",
      time: "19:00",
      tournament: "IEM Dallas",
    },
    {
      id: 3,
      opponent: "G2 Esports",
      date: "2025-05-05",
      time: "21:30",
      tournament: "IEM Dallas",
    },
  ]

  return (
    <div className="mt-12 w-full max-w-4xl bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-black text-center">Próximos Jogos 🎯</h2>
      <ul className="space-y-4">
        {matches.map((match) => (
          <li key={match.id} className="border-b pb-4 last:border-b-0">
            <p className="text-black text-lg font-semibold">{match.opponent} 🆚 FURIA</p>
            <p className="text-gray-600">{match.tournament}</p>
            <p className="text-gray-600">{match.date} às {match.time}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
