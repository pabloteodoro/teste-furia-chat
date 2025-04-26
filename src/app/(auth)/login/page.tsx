"use client"

import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"



export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    const { user, loading } = useAuth()
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
        await signInWithEmailAndPassword(auth, email, password)
        router.push("/chat")
        } catch (error) {
            console.error(error)
        setError("Email ou senha inválidos")
        }
    }
    
    if (loading) return <p>Carregando...</p>
    
    if (user) {
        router.push("/chat")
        return null
    }



    return (
        <div className="win-h-screen flex items-center justify-center bg-gray-900">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h1 className="text-2xl font-bold mb-6 text-center text-black">Login - FURIA CHAT 🐆</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />

            <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />

            <button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded transition duration-300">Entrar</button>
        </form>
        </div>
    )
}