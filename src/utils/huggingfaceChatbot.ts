// src/utils/huggingfaceChatbot.ts


const HF_API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

const HF_API_KEY = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY || "hf_xxxxx"; 

export async function getAIChatbotResponse(message: string): Promise<string> {
  try {
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: message })
    });
    
    const data = await response.json();
    return data.generated_text || fallbackToLocalResponse(message);
  } catch (error) {
    console.error("Erro na API do Hugging Face:", error);
    return fallbackToLocalResponse(message);
  }
}

// Função de fallback que usa o chatbot local quando a API falha
async function fallbackToLocalResponse(message: string): Promise<string>  {
  // Importe a função do chatbot local
 const localChatBot = await import("./localChatBot");
  return localChatBot.getChatbotResponse(message);
}