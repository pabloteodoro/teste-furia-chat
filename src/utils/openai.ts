// src/utils/openai.ts

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Melhor usar env, não hardcoded!
  dangerouslyAllowBrowser: true, // Necessário para Next.js no client
});

export const getChatbotResponse = async (message: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: message }],
    });

    return response.choices[0]?.message.content?.trim() || "Desculpe, não entendi.";
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return "Erro ao processar a resposta do bot.";
  }
};
