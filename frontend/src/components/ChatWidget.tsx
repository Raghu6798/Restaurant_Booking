import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MessageSquare, Send, X } from "lucide-react";
import { motion } from "framer-motion";

// API Endpoint
const API_URL = "https://restaurantbot-production.up.railway.app/chat";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! Bawarchi Baba here. How can I assist you with your booking?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll chat to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input field when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Function to handle sending messages
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send the correct payload structure: { user_input: input }
      const response = await axios.post(API_URL, { user_input: input });
      setMessages((prev) => [
        ...prev,
        {
          sender: "Bawarchi Baba",
          text: response.data.response,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong!",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition"
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </button>

      {/* Chatbox UI */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="w-80 bg-white shadow-xl rounded-lg overflow-hidden mt-3"
        >
          <div className="bg-indigo-600 text-white p-3 font-semibold">Chat with Bawarchi</div>
          <div className="p-3 h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} my-2`}>
                <div className={`p-2 max-w-xs rounded-lg ${msg.sender === "user" ? "bg-indigo-500 text-white" : "bg-gray-200 text-black"}`}>
                  <p>{msg.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
            {isLoading && <div className="text-gray-500 text-sm italic text-center">Checking the dashboard .....</div>}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="flex p-2 border-t">
            <input
              type="text"
              ref={inputRef}
              className="flex-1 p-2 text-sm border rounded-md focus:outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="p-2 text-indigo-600 hover:text-indigo-800">
              <Send size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatWidget;
