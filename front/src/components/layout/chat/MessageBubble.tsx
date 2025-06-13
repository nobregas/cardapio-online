import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { Message } from "../../../types";

export const MessageBubble: React.FC<{
  message: Message;
  index: number;
}> = ({ message, index }) => {
  const isUser = message.sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`flex items-start gap-2 max-w-xs lg:max-w-sm ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`
            w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
            ${
              isUser
                ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                : "bg-gray-100"
            }
          `}
        >
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-gray-600" />
          )}
        </div>

        <motion.div
          className={`
              p-3 rounded-2xl shadow-sm
              ${
                isUser
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-br-md"
                  : "bg-white text-gray-800 rounded-bl-md"
              }
            `}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
