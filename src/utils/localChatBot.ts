// src/utils/localChatbot.ts

type Rule = {
    patterns: string[];
    responses: string[];
  };
  
  // Função de análise de sentimento
  function analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    const positiveWords = ['bom', 'ótimo', 'excelente', 'gosto', 'feliz', 'ajudou', 'obrigado', 'legal', 'maravilhoso', 'adorei'];
    const negativeWords = ['ruim', 'péssimo', 'horrível', 'não gosto', 'insatisfeito', 'problema', 'difícil', 'complicado', 'confuso', 'lento'];
    
    const lowerText = text.toLowerCase();
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) positiveScore++;
    });
    
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeScore++;
    });
    
    if (positiveScore > negativeScore) return 'positive';
    if (negativeScore > positiveScore) return 'negative';
    return 'neutral';
  }
  
  // Respostas baseadas em sentimento
  const sentimentResponses = {
    positive: [
      "Fico feliz que esteja satisfeito!",
      "Que bom que você está gostando!",
      "Obrigado pelo feedback positivo!",
      "É ótimo saber que ajudei de forma positiva!"
    ],
    negative: [
      "Sinto muito pela sua experiência. Como posso ajudar a melhorar?",
      "Peço desculpas por qualquer inconveniente. Como posso resolver isso?",
      "Lamento que não esteja satisfeito. O que podemos fazer melhor?",
      "Entendo sua frustração. Vamos tentar resolver isso juntos."
    ],
    neutral: [] // usará as respostas padrão
  };
  
  const chatbotRules: Rule[] = [
    {
      patterns: ["olá", "oi", "e aí", "hey", "bom dia", "boa tarde", "boa noite"],
      responses: ["Olá! Como posso ajudar?", "Oi! Em que posso ser útil hoje?", "Olá! Estou aqui para responder suas dúvidas."]
    },
    // ... suas outras regras continuam aqui
  ];
  
  // Resposta padrão quando nenhuma regra corresponder
  const defaultResponses = [
    "Desculpe, não entendi. Pode reformular?",
    "Não tenho certeza do que você quer dizer. Pode explicar de outra forma?",
    "Hmm, não consegui compreender. Poderia ser mais específico?"
  ];
  
  export function getChatbotResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    const sentiment = analyzeSentiment(message);
    
    // Verificar se a mensagem expressa principalmente um sentimento
    // Se o sentimento for forte e não houver perguntas específicas
    if (sentiment !== 'neutral' && 
        !chatbotRules.some(rule => rule.patterns.some(pattern => lowerMessage.includes(pattern)))) {
      // Usar respostas baseadas em sentimento
      if (sentiment === 'positive') {
        const randomIndex = Math.floor(Math.random() * sentimentResponses.positive.length);
        return sentimentResponses.positive[randomIndex];
      } else if (sentiment === 'negative') {
        const randomIndex = Math.floor(Math.random() * sentimentResponses.negative.length);
        return sentimentResponses.negative[randomIndex];
      }
    }
    
    // Segue o fluxo normal de verificação de regras
    for (const rule of chatbotRules) {
      if (rule.patterns.some(pattern => lowerMessage.includes(pattern))) {
        // Seleciona uma resposta aleatória para a regra
        const randomIndex = Math.floor(Math.random() * rule.responses.length);
        
        // Adiciona um comentário sobre sentimento se for muito forte
        const response = rule.responses[randomIndex];
        if (sentiment === 'positive' && Math.random() > 0.7) {
          return response + " Você parece estar de bom humor hoje!";
        } else if (sentiment === 'negative' && Math.random() > 0.7) {
          return response + " Espero que isso ajude a melhorar sua experiência.";
        }
        
        return response;
      }
    }
    
    // Se nenhuma regra corresponder, retorna uma resposta padrão aleatória
    const randomIndex = Math.floor(Math.random() * defaultResponses.length);
    return defaultResponses[randomIndex];
  }