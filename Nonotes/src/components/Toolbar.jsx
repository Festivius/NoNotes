import React, { useState } from "react";
import { Bot, X } from "lucide-react";
import AiChat from "./AiChat";

const Toolbar = ({ currentNote, handleTitleChange, handleSave, handleNewNote, isSaved, bold, italic, size, onBoldToggle, onItalicToggle, onSizeChange }) => {
  const [ai, setAi] = useState(false);

  return (
    <div className="toolbar-wrapper">
      <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between space-x-4 max-w-[1400px] mx-auto">
          {/* Left section - Title */}
          <div className="flex-1 min-w-[200px]">
            <input 
              type="text" 
              value={currentNote?.title || ""} 
              onChange={handleTitleChange}
              className="w-full bg-transparent text-xl font-medium focus:outline-none border-b-2 border-transparent focus:border-gray-400 text-gray-900 px-2 py-1 transition-all"
              placeholder="Untitled Note"
            />
          </div>

          {/* Center section - Formatting */}
          <div className="flex items-center space-x-3 bg-white px-4 py-1.5 rounded-lg shadow-sm">
            <button 
              className={`px-4 py-1.5 rounded-md transition-all ${bold ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={onBoldToggle}
            >
              <span className="font-bold">B</span>
            </button>
            <div className="h-6 w-px bg-gray-300"/>
            <button 
              className={`px-4 py-1.5 rounded-md transition-all ${italic ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={onItalicToggle}
            >
              <span className="italic">I</span>
            </button>
            <div className="h-6 w-px bg-gray-300"/>
            <select 
              className="px-3 py-1.5 rounded-md bg-transparent text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
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
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-white text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
              onClick={() => setAi(true)}
            >
              <Bot size={18} />
              <span>AI Assistant</span>
            </button>
            <button 
              onClick={handleSave} 
              className={`px-4 py-2 rounded-md transition-all shadow-sm ${isSaved ? 'bg-gray-200 text-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              {isSaved ? "Saved" : "Save"}
            </button>
            <button 
              onClick={handleNewNote} 
              className="px-4 py-2 rounded-md bg-white text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
            >
              New Note
            </button>
          </div>
        </div>
      </div>

      {/* AI Chat popup */}
      {ai && (
        <div className='absolute top-0 right-0 bg-white p-4 shadow-lg rounded-lg'>
          <button
            className="absolute top-2 left-2 text-red-500 hover:text-red-700 transition"
            onClick={() => setAi(false)}
          >
            <X size={30} /> {/* Red X Icon */}
          </button>
          <AiChat />
        </div>
      )}
    </div>
  );
};

export default Toolbar;