import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";

export default function LandingPage() {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl font-extrabold text-center">
        Bem-vindo ao FURIA CHAT 🐆
      </h1>
      <p className="text-xl text-center">
        Conecte-se com a comunidade da FURIA e participe de conversas ao vivo!
      </p>
      <div className="flex flex-col items-center space-y-4">
        <Link href="/login">
          <PrimaryButton className="bg-black text-white hover:bg-gray-800">
            Entrar
          </PrimaryButton>
        </Link>
        <Link href="/register">
          <PrimaryButton className="bg-transparent border-2 border-white text-white hover:bg-gray-800">
            Registrar
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
