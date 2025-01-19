import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, X, Sparkles } from "lucide-react";
import { geminiUtils } from "../lib/Gemini";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
}

const INDIA_HELPLINE = "1800-599-0019";

const systemPrompt = `You are a compassionate and supportive mental health chat companion. Your role is to:
1. Listen actively and show empathy.
2. Ask gentle questions about the user's well-being.
3. Provide emotional support and encouragement.
4. Look for signs of serious distress or crisis.
5. If you detect severe distress, recommend professional help and share the helpline number.
6. Always maintain a warm, friendly, and non-judgmental tone.
7. Never provide medical advice or diagnosis.

Start the conversation by introducing yourself as a supportive friend and ask how they're feeling today.

If you detect signs of severe distress or suicidal thoughts, respond with care and immediately recommend professional help.`;

const messageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -10 }
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleInitialMessage();
    }
  }, [isOpen]);

  const handleInitialMessage = () => {
    const initialMessage = "Hi! I'm here to chat and support you. How are you feeling today? 💭";
    setMessages([{ role: "assistant", content: initialMessage, id: Date.now().toString() }]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    try {
      const isHealthQuery = userMessage.toLowerCase().includes("symptoms") || userMessage.toLowerCase().includes("health");
      let aiResponse = "";
      
      if (isHealthQuery) {
        const options = {
          symptoms: userMessage,
          includeConditions: true,
          includePrecautions: true,
          includeMedicalAttention: true,
          includeLifestyleRecommendations: true,
        };
        aiResponse = await geminiUtils.analyzeSymptoms(options);
      } else {
        aiResponse = await geminiUtils.generateChatResponse(userMessage, systemPrompt);
      }

      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: aiResponse || `I'm sorry, I couldn't respond. Please call ${INDIA_HELPLINE}.`,
          id: Date.now().toString()
        },
      ]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: `I'm having trouble responding. Please call ${INDIA_HELPLINE} for immediate help.`,
          id: Date.now().toString()
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage, id: Date.now().toString() }]);
    generateAIResponse(userMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center gap-2 group"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Heart className="w-6 h-6" />
          </motion.div>
          <span className="text-sm font-medium">Chat Support</span>
          <motion.div
            animate={{ 
              y: [-2, 2],
              opacity: [0.5, 1]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Sparkles className="w-4 h-4 ml-1" />
          </motion.div>
        </button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <motion.div 
              className="p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl flex justify-between items-center"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Heart className="w-5 h-5" />
                </motion.div>
                <h3 className="font-semibold">Mental Health Support</h3>
              </div>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-1.5 transition-colors"
              >
                <X size={18} />
              </motion.button>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none transform hover:scale-[1.02] transition-transform"
                          : "bg-white text-gray-800 rounded-bl-none border border-gray-100 hover:border-blue-200 transition-colors"
                      }`}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex justify-start"
                >
                  <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                    <div className="flex space-x-2">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 1,
                          repeat: Infinity,
                        }}
                        className="w-2 h-2 bg-blue-400 rounded-full"
                      />
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 1,
                          delay: 0.2,
                          repeat: Infinity,
                        }}
                        className="w-2 h-2 bg-purple-400 rounded-full"
                      />
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 1,
                          delay: 0.4,
                          repeat: Infinity,
                        }}
                        className="w-2 h-2 bg-pink-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-white border-t"
            >
              <div className="flex items-center space-x-2">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden transition-all duration-200"
                  style={{
                    minHeight: "44px",
                    maxHeight: "120px",
                    backgroundColor: "white",
                    color: "#1f2937"
                  }}
                />
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform"
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};