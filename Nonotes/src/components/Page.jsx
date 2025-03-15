import React, { useState } from "react";
import Footer from "./Footer";
import Toolbar from "./Toolbar";

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
    setCurrentNote(note);
    setContent(note.content);
    setIsSaved(true);
  };

  return (
    <div className="w-full h-screen bg-amber-50 flex flex-col">
      <Toolbar 
        currentNote={currentNote}
        handleTitleChange={handleTitleChange}
        handleSave={handleSave}
        handleNewNote={handleNewNote}
        isSaved={isSaved}
      />

      {/* Saved notes */}
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
        

        {/* Written */}
        <div className="flex-1 p-4 overflow-y-auto">
          <textarea
            value={content}
            onChange={handleContentChange}
            className="w-full h-full p-4 bg-white rounded-lg border border-amber-200 focus:outline-none focus:border-amber-400 resize-none text-amber-900 shadow-sm"
            placeholder="Write your thoughts here..."
          />
        </div>
      </div>

      <Footer content={content} />
    </div>
  );
};

export default Page;