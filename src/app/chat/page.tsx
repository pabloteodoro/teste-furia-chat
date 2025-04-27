"use client"

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import PrimaryButton from "@/components/PrimaryButton";
import UpcomingMatches from "@/components/UpComingMatches";
import ChatBot from "@/components/ChatBot"

export default function ChatPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) return <p>Carregando...</p>;

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-between p-8">
      <header className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bem-vindo, {user.email}</h1>
        <PrimaryButton
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700"
        >
          Sair
        </PrimaryButton>
      </header>

      <main className="w-full flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-semibold">Próximos Jogos</h2>
        <UpcomingMatches />
        <ChatBot /> 
      </main>

      <footer className="w-full text-center mt-6 text-gray-400">
        <p>FURIA Chat - 2025</p>
      </footer>
    </div>
  );
}
