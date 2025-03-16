import React, { useState } from "react";
import { Bot, X } from "lucide-react";
import AiChat from "./AiChat";

const Toolbar = ({ currentNote, handleTitleChange, handleSave, handleNewNote, isSaved, bold, italic, size, onBoldToggle, onItalicToggle, onSizeChange }) => {
  const [ai, setAi] = useState(false);

  // Color palette
  const colors = {
    primary: "#6B9080",
    secondary: "#A4C3B2",
    tertiary: "#CCE3DE",
    background: "#EAF4F4",
    accent: "#F6FFF8"
  };

  return (
    <div className="toolbar-wrapper">
      <div style={{ backgroundColor: colors.background }} className="px-6 py-4 border-b border-opacity-30" style={{ borderColor: colors.secondary }}>
        <div className="flex items-center justify-between space-x-4 max-w-[1400px] mx-auto">
          {/* Left section - Title */}
          <div className="flex-1 min-w-[200px]">
            <input 
              type="text" 
              value={currentNote?.title || ""} 
              onChange={handleTitleChange}
              style={{ 
                backgroundColor: "transparent", 
                borderColor: colors.primary 
              }}
              className="w-full text-xl font-medium focus:outline-none border-b-2 border-transparent focus:border-opacity-70 px-2 py-1 transition-all"
              placeholder="Untitled Note"
            />
          </div>

          {/* Center section - Formatting */}
          <div style={{ backgroundColor: colors.accent }} className="flex items-center space-x-3 px-4 py-2 rounded-lg shadow-sm">
            <button 
              style={{ 
                backgroundColor: bold ? colors.tertiary : "transparent",
                color: bold ? colors.primary : "inherit"
              }}
              className={`px-4 py-1.5 rounded-md transition-all hover:bg-opacity-50`}
              onClick={onBoldToggle}
            >
              <span className="font-bold">B</span>
            </button>
            <div style={{ backgroundColor: colors.tertiary }} className="h-6 w-px"/>
            <button 
              style={{ 
                backgroundColor: italic ? colors.tertiary : "transparent",
                color: italic ? colors.primary : "inherit"
              }}
              className={`px-4 py-1.5 rounded-md transition-all hover:bg-opacity-50`}
              onClick={onItalicToggle}
            >
              <span className="italic">I</span>
            </button>
            <div style={{ backgroundColor: colors.tertiary }} className="h-6 w-px"/>
            <select 
              style={{ backgroundColor: "transparent", color: colors.primary }}
              className="px-3 py-1.5 rounded-md hover:bg-opacity-50 transition-all cursor-pointer"
              onChange={(e) => onSizeChange(e.target.value)}
              value={size}
            >
              <option value="small">Small</option>
              <option value="normal">Normal</option>
              <option value="large">Large</option>
            </select>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center space-x-3">
            <button 
              style={{ backgroundColor: colors.tertiary, color: colors.primary }}
              className="flex items-center space-x-2 px-4 py-2 rounded-md transition-all shadow-sm hover:opacity-80"
              onClick={() => setAi(true)}
            >
              <Bot size={18} />
              <span>AI Assistant</span>
            </button>
            <button 
              onClick={handleSave} 
              style={{ 
                backgroundColor: isSaved ? colors.tertiary : colors.primary,
                color: isSaved ? colors.primary : colors.accent
              }}
              className="px-4 py-2 rounded-md transition-all shadow-sm hover:opacity-80"
            >
              {isSaved ? "Saved" : "Save"}
            </button>
            <button 
              onClick={handleNewNote}
              style={{ backgroundColor: colors.secondary, color: colors.accent }}
              className="px-4 py-2 rounded-md transition-all shadow-sm hover:opacity-80"
            >
              New Note
            </button>
          </div>
        </div>
      </div>

      {/* AI Chat popup */}
      {ai && (
        <div style={{ backgroundColor: colors.accent }} className='absolute top-0 right-0 p-4 shadow-lg rounded-lg'>
          <button
            style={{ color: colors.primary }}
            className="absolute top-2 left-2 hover:opacity-70 transition"
            onClick={() => setAi(false)}
          >
            <X size={30} />
          </button>
          <AiChat />
        </div>
      )}
    </div>
  );
};

export default Toolbar;