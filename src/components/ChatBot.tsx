// src/components/ChatBot.tsx

"use client"

import { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '@/utils/localChatBot'; 

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Olá! Como posso ajudar você hoje?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Rolar para a última mensagem
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    
    // Adiciona a mensagem do usuário
    const userMessage = { text: inputValue, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simula um pequeno atraso para dar sensação de processamento
    setTimeout(() => {
      const botResponse = getChatbotResponse(userMessage.text);
      setMessages(prevMessages => [...prevMessages, { text: botResponse, isUser: false }]);
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md h-96 border rounded-lg shadow-md bg-white">
      {/* Header do Chat */}
      <div className="bg-blue-600 text-white p-3 rounded-t-lg">
        <h2 className="text-lg font-semibold">Assistente Virtual</h2>
      </div>
      
      {/* Área de Mensagens */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`my-2 p-2 rounded-lg max-w-xs ${
              message.isUser 
              ? 'ml-auto bg-blue-500 text-white' 
              : 'mr-auto bg-gray-200 text-gray-800'
            }`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="my-2 p-2 rounded-lg bg-gray-200 text-gray-800 mr-auto">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Área de Input */}
      <div className="border-t p-2 flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          className="flex-1 border rounded-l p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button 
          onClick={handleSendMessage}
          className={`px-4 py-2 rounded-r text-white ${
            isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none`}
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}