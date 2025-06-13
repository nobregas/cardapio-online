import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Message } from "../../../types";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

export const ChatWindow: React.FC<{
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
}> = ({ isOpen, messages, isTyping, onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 text-white">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bot className="w-5 h-5" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-lg">
                  Assistente de Cardápio
                </h3>
                <p className="text-sm opacity-90">
                  Online • Pronto para ajudar
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-full"
              >
                <div className="text-center text-gray-500">
                  <Bot className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm">
                    Olá! Como posso ajudá-lo com seu cardápio hoje?
                  </p>
                </div>
              </motion.div>
            )}

            {messages.map((message, index) => (
              <MessageBubble key={message.id} message={message} index={index} />
            ))}

            <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
                placeholder="Digite sua mensagem..."
                className="flex-1 p-3 border border-gray-200 rounded-full outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
              <motion.button
                onClick={handleSubmit}
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: inputValue.trim() ? 1.1 : 1 }}
                whileTap={{ scale: inputValue.trim() ? 0.9 : 1 }}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
