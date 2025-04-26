"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import UpcomingMatches from "@/components/UpComingMatches"

export default function ChatPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    const handleLogout = async () => {
        await signOut(auth)
        router.push("/")
    }

    if (loading) return <p>Carregando...</p>

    if (!user) {
        router.push("/")
        return null
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Bem-vindo ao Chat da FURIA, {user.email}! 🐆</h1>
            <button 
                onClick={handleLogout} 
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-bold transition"
            >
                Sair
            </button>
            <UpcomingMatches/>
        </div>
    )
}


