import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export const ChatButton: React.FC<{
  isOpen: boolean;
  onClick: () => void;
}> = ({ isOpen, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
          fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg
          flex items-center justify-center text-white font-semibold
          transition-colors duration-300 z-50
          ${
            isOpen
              ? "bg-gradient-to-r from-purple-500 to-indigo-500"
              : "bg-gradient-to-r from-red-400 to-red-500"
          }
        `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={
        isOpen
          ? {}
          : {
              boxShadow: [
                "0 0 0 0px rgba(239, 68, 68, 0.7)",
                "0 0 0 10px rgba(239, 68, 68, 0)",
                "0 0 0 0px rgba(239, 68, 68, 0)",
              ],
            }
      }
      transition={{
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </motion.div>
    </motion.button>
  );
};
