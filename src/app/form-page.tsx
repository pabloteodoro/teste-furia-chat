"use client"

import { useRouter } from "next/navigation"
import PrimaryButton from "@/components/PrimaryButton"
import { FiArrowLeft, FiX } from "react-icons/fi"

export default function FormPage() {
    const router = useRouter()

   
    const handleBack = () => {
        router.back() 
    }

   
    const handleCancel = () => {
       
        router.push("/") 
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Formulário de Exemplo</h1>

            {}
            <PrimaryButton onClick={handleBack} className="mb-4 bg-gray-600 hover:bg-gray-700">
                <FiArrowLeft className="mr-2" /> Voltar
            </PrimaryButton>

            {}
            <PrimaryButton onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600">
                <FiX className="mr-2" /> Cancelar
            </PrimaryButton>
        </div>
    )
}
