/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { ChatHistory, Message } from "../../../types";
import { ChatButton } from "./ChatButton";
import { ChatWindow } from "./ChatWindow";
import { sendMessageToAI } from "../../../services/ai.service";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      text: `👋 Olá! Sou seu assistente de IA para gerenciamento de cardápio. Como posso ajudá-lo hoje?`,
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Você precisa estar logado para usar o chat.");
      }

      const historyForAPI: ChatHistory[] = updatedMessages
        .slice(1)
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        }));

      const aiResponseText = await sendMessageToAI(messageText, historyForAPI);

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: aiResponseText,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error("Erro no chat:", error);

      let errorText =
        "Desculpe, ocorreu um erro ao me conectar. Por favor, tente novamente.";

      if (
        error?.message?.includes("login") ||
        error?.message?.includes("token")
      ) {
        errorText =
          "Sessão expirada. Por favor, faça login novamente para continuar usando o chat.";
      }

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: errorText,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
      />
    </>
  );
};

export default ChatWidget;
