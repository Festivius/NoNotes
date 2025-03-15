import React from "react";

const Toolbar = ({ currentNote, handleTitleChange, handleSave, handleNewNote, isSaved }) => {
  return (
    <div className="toolbar-wrapper">
      <div className="bg-amber-100 p-4 border-b border-amber-200 flex justify-between items-center">
        <input 
          type="text" 
          value={currentNote?.title || ""} 
          onChange={handleTitleChange}
          className="bg-transparent text-xl font-medium focus:outline-none border-b border-transparent focus:border-amber-300 text-amber-900"
        />
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