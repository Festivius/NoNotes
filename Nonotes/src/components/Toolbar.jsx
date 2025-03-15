import React, { useState } from "react";
import { Bot, X} from "lucide-react";
import AiChat from "./AiChat";

const Toolbar = ({ currentNote, handleTitleChange, handleSave, handleNewNote, isSaved }) => {
  const [ai, setAi] = useState(false);

  return (
    <div className="toolbar-wrapper">
      <div className="bg-amber-100 p-4 border-b border-amber-200 flex justify-between items-center">
        <input 
          type="text" 
          value={currentNote?.title || ""} 
          onChange={handleTitleChange}
          className="bg-transparent text-xl font-medium focus:outline-none border-b border-transparent focus:border-amber-300 text-amber-900"
        />

        <div className="">
          <button 
            className="flex items-center space-x-2 px-3 py-1 rounded-md bg-white text-neutral-500 hover:bg-amber-300 transition-colors text-sm"
            onClick={() => setAi(true)}
          >
            <Bot size={16} /> {/* AI Icon */}
            <span>AI</span>
          </button>
        </div>

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

        <div className="flex space-x-2">
          <button 
            onClick={handleSave} 
            className={`px-4 py-2 rounded-md ${isSaved ? 'bg-amber-200 text-amber-700' : 'bg-amber-500 text-white'} hover:bg-amber-600 transition-colors`}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
          <button 
            onClick={handleNewNote} 
            className="px-4 py-2 rounded-md bg-amber-200 text-amber-700 hover:bg-amber-300 transition-colors"
          >
            New Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;