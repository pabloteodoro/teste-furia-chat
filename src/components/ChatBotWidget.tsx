// src/components/ChatbotWidget.tsx
"use client"

import { useState } from 'react';
import ChatBot from './ChatBot';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot container */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 shadow-2xl">
          <ChatBot />
          <button 
            onClick={() => setIsOpen(false)} 
            className="absolute top-3 right-3 text-white hover:text-gray-200 focus:outline-none"
            aria-label="Fechar chat"
          >
            ✕
          </button>
        </div>
      )}
      
      {/* Botão do chatbot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg focus:outline-none"
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}