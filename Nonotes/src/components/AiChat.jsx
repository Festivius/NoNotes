import React, { useState } from "react";
import { X } from "lucide-react";

const AiChat = ({ noteContent, onClose }) => {
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const GEMINI_API_KEY = "AIzaSyD7rQq_zCe6BoDoeDJjVBEAlVc3GkLoFFA";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const promptText = `Note Content: Pretend you are a naive 8 year old and are not too sure about anything. Do not respond with straightforward answers. Respond with that in mind. ${noteContent || "No content"}\nUser question: ${input}`;
    
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    setMessages((prev) => [...prev, { text: "Thinking...", sender: "ai" }]);

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: promptText }]
            }
          ]
        })
      });

      const data = await response.json();
      console.log("API Response:", data); 

      if (data.error) {
        throw new Error(data.error.message || "API Error");
      }

      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          text: data.candidates[0].content.parts[0].text.trim(),
          sender: "ai"
        }
      ]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: "Sorry, something went wrong.", sender: "ai" }
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-[350px] bg-white rounded-lg overflow-hidden shadow-2xl border border-gray-200">
      <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-lg font-medium text-gray-900">Notbuddy - AI Assistant</h1>
        <button
          className="p-1.5 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors rounded-full"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-center gap-2">
          <textarea
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none bg-white text-gray-900 text-sm h-10"
            rows="1"
          />
          <button
            onClick={sendMessage}
            className="p-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;