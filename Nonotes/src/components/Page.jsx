import React, { useState } from "react";

const Page = () => {
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ id: 1, title: "Untitled Note", content: "" });
  const [isSaved, setIsSaved] = useState(true);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setCurrentNote({ ...currentNote, content: newContent });
    setIsSaved(false);
  };

  const handleSave = () => {
    const updatedNotes = notes.find(note => note.id === currentNote.id) 
      ? notes.map(note => note.id === currentNote.id ? currentNote : note)
      : [...notes, currentNote];
    
    setNotes(updatedNotes);
    setIsSaved(true);
  };

  const handleNewNote = () => {
    if (!isSaved) {
      if (window.confirm("You have unsaved changes. Save before creating a new note?")) {
        handleSave();
      }
    }
    
    const newId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 1;
    const newNote = { id: newId, title: `Untitled Note ${newId}`, content: "" };
    setCurrentNote(newNote);
    setContent("");
    setIsSaved(true);
  };

  const handleTitleChange = (e) => {
    setCurrentNote({ ...currentNote, title: e.target.value });
    setIsSaved(false);
  };

  const handleSelectNote = (note) => {
    if (!isSaved) {
      if (window.confirm("You have unsaved changes. Save before switching notes?")) {
        handleSave();
      }
    }
    setCurrentNote(note);
    setContent(note.content);
    setIsSaved(true);
  };

  return (
    <div className="w-full h-screen bg-amber-50 flex flex-col">
      <div className="bg-amber-100 p-4 border-b border-amber-200 flex justify-between items-center">
        <input 
          type="text" 
          value={currentNote.title} 
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
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 bg-amber-100 p-2 overflow-y-auto border-r border-amber-200">
          {notes.map(note => (
            <div 
              key={note.id} 
              onClick={() => handleSelectNote(note)}
              className={`p-3 mb-2 rounded-md cursor-pointer ${currentNote.id === note.id ? 'bg-amber-300' : 'bg-amber-50 hover:bg-amber-200'}`}
            >
              <h3 className="font-medium text-amber-900 truncate">{note.title}</h3>
              <p className="text-amber-700 text-sm truncate">{note.content.substring(0, 50)}</p>
            </div>
          ))}
          {notes.length === 0 && (
            <div className="text-center p-4 text-amber-700">
              No notes yet. Create one!
            </div>
          )}
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          <textarea
            value={content}
            onChange={handleContentChange}
            className="w-full h-full p-4 bg-white rounded-lg border border-amber-200 focus:outline-none focus:border-amber-400 resize-none text-amber-900 shadow-sm"
            placeholder="Write your thoughts here..."
          />
        </div>
      </div>
      
      <div className="bg-amber-100 p-3 border-t border-amber-200 flex justify-between items-center">
        <div className="text-amber-700 text-sm">
          {content.length} characters
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-md bg-amber-200 text-amber-700 hover:bg-amber-300 transition-colors text-sm">
            Export
          </button>
          <button className="px-3 py-1 rounded-md bg-amber-200 text-amber-700 hover:bg-amber-300 transition-colors text-sm">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;