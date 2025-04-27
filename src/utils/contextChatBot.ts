// src/utils/contextChatbot.ts

type Rule = {
    patterns: string[];
    responseGenerator: (context: ConversationContext) => string;
  };
  
  // Modifique a interface para incluir lastMessage
  interface ConversationContext {
    topics: Set<string>;
    userName?: string;
    lastTopic?: string;
    productInterest?: string;
    lastMessage: string; // Adicione esta linha para incluir lastMessage
  }
  
  const chatbotRules: Rule[] = [
    {
      patterns: ["olá", "oi", "e aí", "hey", "bom dia", "boa tarde", "boa noite"],
      responseGenerator: (context) => {
        if (context.userName) {
          return `Olá ${context.userName}! Como posso ajudar hoje?`;
        }
        return "Olá! Como posso ajudar? Se quiser, pode me dizer seu nome.";
      }
    },
    {
      patterns: ["meu nome é", "me chamo", "sou o", "sou a"],
      responseGenerator: (context) => {
        const nameMatch = context.lastMessage.match(/(?:meu nome é|me chamo|sou (?:o|a))\s+(\w+)/i);
        if (nameMatch && nameMatch[1]) {
          context.userName = nameMatch[1];
          return `Prazer em conhecê-lo, ${context.userName}! Como posso ajudar?`;
        }
        return "Prazer em conhecê-lo! Como posso ajudar?";
      }
    },
    // ... adicione mais regras com contexto
  ];
  
  // Inicializa o contexto - agora com lastMessage como parte da interface
  let conversationContext: ConversationContext = {
    topics: new Set(),
    lastMessage: ""
  };
  
  export function getChatbotResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    conversationContext.lastMessage = lowerMessage;
    
    // Adiciona análise de tópicos
    if (lowerMessage.includes("produto")) {
      conversationContext.topics.add("produto");
      conversationContext.lastTopic = "produto";
    } else if (lowerMessage.includes("preço")) {
      conversationContext.topics.add("preço");
      conversationContext.lastTopic = "preço";
    }
    
    // Verifica se alguma regra corresponde
    for (const rule of chatbotRules) {
      if (rule.patterns.some(pattern => lowerMessage.includes(pattern))) {
        return rule.responseGenerator(conversationContext);
      }
    }
    
    // Resposta contextual baseada no último tópico
    if (conversationContext.lastTopic === "produto") {
      return "Sobre nossos produtos, posso dar mais detalhes. O que exatamente você gostaria de saber?";
    }
    
    // Resposta padrão
    return "Desculpe, não entendi. Pode reformular?";
  }
  
  // Função para resetar o contexto (use ao iniciar uma nova conversa)
  export function resetContext() {
    conversationContext = {
      topics: new Set(),
      lastMessage: ""
    };
  }