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
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [size, setSize] = useState("normal");
  const [font, setFont] = useState("sans-serif");

  const handleContentChange = (e) => {
    let newContent = e.target.value;
    setCurrentNote({ ...currentNote, content: newContent });
    setIsSaved(false);

    const punctuationRegex = /[.,;!?(){}\[\]"':-]/;
    const numberRegex = /[23456789]/;
    let updatedNote = '';
    let currentWord = '';
    let inWord = false;

    for (let i = 0; i < correctSpellings.length; i++) {
        if (newContent.includes(correctSpellings[i])) {
            newContent = newContent.replace(new RegExp(`\\b${correctSpellings[i]}\\b`, 'gi'), commonMisspelledWords[i]);
        }
    }

    if (!punctuationRegex.test(newContent.charAt(newContent.length - 1))) {
      for (let i = 0; i < newContent.length; i++) {
        const char = newContent[i];
        if (numberRegex.test(char)) {
          let number = char;
          let binaryRepresentation = "";

          switch (number) {
            case '2':
              binaryRepresentation = "10";
              break;
            case '3':
              binaryRepresentation = "11";
              break;
            case '4':
              binaryRepresentation = "100";
              break;
            case '5':
              binaryRepresentation = "101";
              break;
            case '6':
              binaryRepresentation = "110";
              break;
            case '7':
              binaryRepresentation = "111";
              break;
            case '8':
              binaryRepresentation = "1000";
              break;
            case '9':
              binaryRepresentation = "1001";
              break;
            default:
              break;
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
          if (!numberRegex.test(char)) {
            currentWord += char;
            inWord = true;
          }
        }
      }

      if (currentWord) {
        updatedNote += currentWord;
      }

      if (Math.random() > 0.15) {
        setContent(updatedNote);
      } else if (Math.random() > 0.6) {
        const randomChar = String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
        setContent(newContent + randomChar);
      }

      if (Math.random() < 0.03) {
        const randomIndex = Math.floor(Math.random() * emojis.length);
        const randomEmoji = emojis[randomIndex];
        setContent(newContent + randomEmoji);
      }
    }
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

  const handleBoldToggle = () => {
    setBold(!bold);
  };

  const handleItalicToggle = () => {
    setItalic(!italic);
  };

  const handleSizeChange = (newSize) => {
    setSize(newSize);
  };

  const handleFontChange = (newFont) => {
    setFont(newFont);
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col">
      <Toolbar 
        currentNote={currentNote}
        handleTitleChange={handleTitleChange}
        handleSave={handleSave}
        handleNewNote={handleNewNote}
        isSaved={isSaved}
        bold={bold}
        italic={italic}
        size={size}
        font={font}
        onBoldToggle={handleBoldToggle}
        onItalicToggle={handleItalicToggle}
        onSizeChange={handleSizeChange}
        onFontChange={handleFontChange}
      />

      {/* Saved notes */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 bg-gray-100 p-2 overflow-y-auto border-r border-gray-200">
          {notes.map(note => (
            <div 
              key={note.id} 
              onClick={() => handleSelectNote(note)}
              className={`p-3 mb-2 rounded-md cursor-pointer ${currentNote.id === note.id ? 'bg-gray-300' : 'bg-gray-50 hover:bg-gray-200'}`}
            >
              <h3 className="font-medium text-gray-900 truncate">{note.title}</h3>
              <p className="text-gray-700 text-sm truncate">{note.content.substring(0, 50)}</p>
            </div>
          ))}
          {notes.length === 0 && (
            <div className="text-center p-4 text-gray-700">
              No notes yet. Create one!
            </div>
          )}
        </div>
        

        {/* Written */}
        <div className="flex-1 p-4 overflow-y-auto">
          <textarea
            value={content}
            onChange={handleContentChange}
            className={`w-full h-full p-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 resize-none text-gray-900 shadow-sm ${bold ? 'font-bold' : ''} ${italic ? 'italic' : ''} ${size === 'large' ? 'text-9xl' : size === 'small' ? 'text-[0.5rem]' : ''} ${font}`}
            placeholder="Write your thoughts here..."
          />
        </div>
      </div>

      <Footer content={content} />
    </div>
  );
};

export default Page;
