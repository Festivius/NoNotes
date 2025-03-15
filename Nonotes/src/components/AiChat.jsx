import React, { useState } from "react";

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    
    // Simulate AI response (optional)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Thinking...", sender: "ai" },
      ]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-amber-100 p-4 border-b border-amber-200">
        <h1 className="text-xl font-medium text-amber-900">Cozy Chat</h1>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-3/4 rounded-lg p-3 ${
                msg.sender === "user"
                  ? "bg-amber-200 text-amber-900"
                  : "bg-white border border-amber-200 text-amber-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="border-t border-amber-200 bg-amber-100 p-4">
        <div className="flex items-center">
          <textarea
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-amber-200 focus:outline-none focus:border-amber-400 resize-none bg-white text-amber-900 h-12"
            rows="1"
          />
          <button
            onClick={sendMessage}
            className="ml-2 p-3 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors"
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
