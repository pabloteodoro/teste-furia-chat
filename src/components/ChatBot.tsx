"use client"

import { useState } from "react";
import { getChatbotResponse } from "@/utils/openai"; // Certo

const ChatBot = () => { // <-- troquei de ChatPage pra ChatBot
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    setMessages([...messages, `Usuário: ${message}`]);
    setLoading(true);

    try {
      const botResponse = await getChatbotResponse(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        `Bot: ${botResponse}`,
      ]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        "Erro ao obter resposta do bot.",
      ]);
    } finally {
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg w-full max-w-md">
      <div className="space-y-2 mb-4 h-64 overflow-y-auto bg-gray-800 p-4 rounded">
        {messages.map((msg, index) => (
          <div key={index} className="text-sm">{msg}</div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite uma mensagem..."
          className="flex-1 px-3 py-2 rounded bg-gray-600 text-white focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white font-semibold disabled:bg-gray-400"
        >
          {loading ? "..." : "Enviar"}
        </button>
      </div>
    </div>
  );
};

export default ChatBot; // <-- exportando como ChatBot
