import React, { useState } from "react";
import Footer from "./Footer";
import Toolbar from "./Toolbar";

const Page = () => {
  const emojis = ['😊', '😂', '😍', '😎', '🥺', '🙌', '👍', '❤️'];
  const commonMisspelledWords = [
    "teh", "waht", "liek", "hwen", "definately", "seperate", "becase", "thier", "freind", "adress", "beleive", 
    "tommorow", "recieve", "occured", "occassionaly", "independant", "embarassment", 
    "calender", "seperete", "alot", "noticable", "resturant", "preferance", "ocasian", 
    "wierd", "necassary", "defiantly", "accomodate", "achieve", "a lot", "believe", 
    "calendar", "colonel", "definitely", "embarrassment", "exceed", "independent", 
    "necessary", "occasion", "receive", "separate", "recommend", "referred", "restaurant", 
    "schedule", "supercede", "tomorrow", "occasionally", "privilege", "vacuum", "mischievous", 
    "independent", "misspell", "occurence", "arguement", "recognize", "refered", "publically", 
    "occurred", "awhile", "untill", "seperately", "maintainance", "reccommend", "beleive", 
    "tommorow", "embarassed", "technoloy", "continuos", "millenium", "yatch", "definately", 
    "untill", "alright", "interupt", "wierd", "maneuver", "preceed", "decent", "realy", "wich", 
    "embarassing", "parliment", "favour", "color", "honor", "theater", "travell", "prefered", 
    "tomatoe", "serch", "supersede", "truley", "sux", "untill", "thorough", "begining", "occurred", 
    "outfit", "recieve", "overexaggerate", "unecessary", "recomend", "publically", "sorrry", 
    "defintely", "diffferent", "congradulations", "alot", "succeed", "similiar", "appologies", 
    "believe", "conscience", "parliment", "guarrantee"
  ];
  const correctSpellings = [
    "the", "what", "like", "when", "definitely", "separate", "because", "their", "friend", "address", "believe", 
    "tomorrow", "receive", "occurred", "occasionally", "independent", "embarrassment", 
    "calendar", "separate", "a lot", "noticeable", "restaurant", "preference", "occasion", 
    "weird", "necessary", "definitely", "accommodate", "achieve", "a lot", "believe", 
    "calendar", "colonel", "definitely", "embarrassment", "exceed", "independent", 
    "necessary", "occasion", "receive", "separate", "recommend", "referred", "restaurant", 
    "schedule", "supercede", "tomorrow", "occasionally", "privilege", "vacuum", "mischievous", 
    "independent", "misspell", "occurrence", "argument", "recognize", "referred", "publicly", 
    "occurred", "a while", "until", "separately", "maintenance", "recommend", "believe", 
    "tomorrow", "embarrassed", "technology", "continuous", "millennium", "yacht", "definitely", 
    "until", "alright", "interrupt", "weird", "maneuver", "precede", "decent", "really", "which", 
    "embarrassing", "parliament", "favor", "color", "honor", "theater", "travel", "preferred", 
    "tomato", "search", "supersede", "truly", "sucks", "until", "thorough", "beginning", "occurred", 
    "outfit", "receive", "overexaggerate", "unnecessary", "recommend", "publicly", "sorry", 
    "definitely", "different", "congratulations", "a lot", "succeed", "similar", "apologies", 
    "believe", "conscience", "parliament", "guarantee"
  ];  
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ id: 1, title: "Untitled Note", content: "" });
  const [isSaved, setIsSaved] = useState(true);

    const handleContentChange = (e) => {
    var newContent = e.target.value;
    setCurrentNote({ ...currentNote, content: newContent });
    setIsSaved(false);

    const punctuationRegex = /[.,;!?(){}\[\]"':-]/;
    const numberRegex = /[23456789]/;
    let updatedNote = '';
    let currentWord = '';
    let inWord = false;

    for (let i = 0; i < 103; i++) {
        if (newContent.includes(correctSpellings[i])) {
            console.log('rahahh"');
            newContent = newContent.replace(correctSpellings[i], commonMisspelledWords[i]);
        }
    }

    if (punctuationRegex.test(newContent.charAt(newContent.length-1)) == false) {

    for (let i = 0; i < newContent.length; i++) {
        const char = newContent[i];
        if (numberRegex.test(char)) {
            console.log('nummm');
            let number = char;
            let binaryRepresentation = "";

            if (number === '2') {
            binaryRepresentation = "10";
            } else if (number === '3') {
            binaryRepresentation = "11";
            } else if (number === '4') {
            binaryRepresentation = "100";
            } else if (number === '5') {
            binaryRepresentation = "101";
            } else if (number === '6') {
            binaryRepresentation = "110";
            } else if (number === '7') {
            binaryRepresentation = "111";
            } else if (number === '8') {
            binaryRepresentation = "1000";
            } else if (number === '9') {
            binaryRepresentation = "1001";
            }

            updatedNote += binaryRepresentation;
        }

        if (char.match(/\s/) || punctuationRegex.test(char)) {
            if (currentWord) {
                updatedNote += currentWord.toLowerCase();
                currentWord = '';
            }
            updatedNote += char;
            inWord = false;
        } else {
            if (numberRegex.test(char) == false) {
                currentWord += char;
                inWord = true;
            }
        }
    }

    // After the loop, if there's any word left, append it to the updatedNote in lowercase
    if (currentWord) {
        updatedNote += currentWord; // Ensure lowercase is applied here
    }

    if (Math.random() > 0.15) {
        setContent(updatedNote); // Update the note with the modified content
    } 
    else if (Math.random() > 0.6) {
      const randomChar = String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
      setContent(newContent + randomChar);
    }

    if (Math.random() < 0.03) {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      const randomEmoji = emojis[randomIndex]; 
      setContent(newContent + randomEmoji); 
    }
  };

  }


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