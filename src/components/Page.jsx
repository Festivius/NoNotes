import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Toolbar from "./Toolbar";
import MathPopup from "./MathPopup";

const Page = () => {
  const emojis = ['😊', '😂', '😍', '😎', '🥺', '🙌', '👍', '❤️',  "🐙", "🦑", "🦐", "🦕", "🦖", "🐉", "🦓", "🦍", "🦦", "🦨",
    "🦔", "🐿️", "🦫", "🦜", "🦩", "🦚", "🦒", "🐅", "🐊", "🦈",
    "🦞", "🐍", "🐸", "🐖", "🐏", "🦘", "🍕", "🍟", "🌮", "🌯",
    "🥙", "🥞", "🍩", "🍿", "🍦", "🍉", "🍇", "🍒", "🥥", "🥑",
    "🍆", "🥕", "🥗", "🍷", "🥃", "☕", "🧃", "🥤", "🍵", "🍾",
    "🛸", "🚀", "⛵", "🏹", "🛶", "🏄", "🎭", "🎨", "🎻", "🛁",
    "🗿", "🚽", "📡", "🕰️", "🦷", "🦴", "💣", "🔮", "🧨", "💀",
    "👽", "🤖", "🕵️", "💃", "🕺", "🎩", "👑", "🥽", "🎭", "🦹‍♂️",
    "🎰", "🎲", "🃏", "♟️", "🔑", "🚬", "🛑", "⚡", "🌪️", "🌋"];

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

  function flipText(text) {
    const flipMap = {
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ',
        'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ',
        'k': 'ʞ', 'l': 'ʃ', 'n': 'u', 'o': 'o',
        'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ',
        'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ',
        'z': 'z', 'A': '∀', 'B': 'ꓭ', 'C': 'Ɔ', 'D': '◖',
        'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁', 'H': 'H', 'I': 'I',
        'J': 'ᒋ', 'K': 'ꓘ', 'L': '˥', 'M': 'W', 'N': 'N',
        'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'ꓤ', 'S': 'S',
        'T': 'ꓕ', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X',
        'Y': '⅄', 'Z': 'Z', '0': '0', '1': 'Ɩ', '2': 'ᄅ',
        '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': '⅂',
        '8': '8', '9': '6', '.': '˙', '?': '¿',
        '!': '¡', '"': '„', '\'': 'ʿ', '(': ')', ')': '(',
        '[': ']', ']': '[', '{': '}', '}': '{'
    };

    return text.split('').map(char => flipMap[char] || char).reverse().join('');
  }

  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([] );
  const [currentNote, setCurrentNote] = useState({ id: 1, title: "Untitled Note", content: "" });
  const [isSaved, setIsSaved] = useState(true);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [size, setSize] = useState("normal");
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [showMathPopup, setShowMathPopup] = useState(false);
  const [isTypingBlocked, setIsTypingBlocked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMathPopup(true);
      setIsTypingBlocked(true);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleMathSolved = () => {
    setShowMathPopup(false);
    setIsTypingBlocked(false);
  };

  const handleContentChange = (e) => {
    if (isTypingBlocked) return;
    
    let newContent = e.target.value;

    if (newContent.length > content.length) {
      const chars = newContent.split('');
      const lastIndex = chars.length - 1;
      const lastChar = chars[lastIndex];

      if (lastChar !== ' ') {
        if (Math.random() < 0.06) {
          chars.pop();
        } 
        else if (Math.random() < 0.06) {
          const letters = 'abcdefghijklmnopqrstuvwxyz';
          chars[lastIndex] = letters[Math.floor(Math.random() * letters.length)];
        }
        
        newContent = chars.join('');
      }
    }

    if (newContent.endsWith(" ")) {
      const words = newContent.trimEnd().split(" ");
      const lastWord = words[words.length - 1];
      if (lastWord && Math.random() > 0.85) {
        const flipped = flipText(lastWord);
        words[words.length - 1] = flipped;
        newContent = words.join(" ") + " ";
      }
    }

    newContent = newContent.replace(/\d/g, (digit) => parseInt(digit).toString(2));

    for (let i = 0; i < correctSpellings.length; i++) {
      if (newContent.includes(correctSpellings[i])) {
        newContent = newContent.replace(
          new RegExp(`\\b${correctSpellings[i]}\\b`, 'gi'),
          commonMisspelledWords[i]
        );
      }
    }

    const words = newContent.split(" ");
    newContent = words.map(word => {
      if (word && Math.random() < 0.008) { 
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        return word + randomEmoji;
      }
      return word;
    }).join(" ");

    setContent(newContent);
    setCurrentNote({ ...currentNote, content: newContent });
    setIsSaved(false);
  };

  const handleSelect = (e) => {
    setSelection({
      start: e.target.selectionStart,
      end: e.target.selectionEnd
    });
  };

  const formatSelectedHeader = (headerType) => {
    if (selection.start === selection.end) return;
    const before = content.substring(0, selection.start);
    const selected = content.substring(selection.start, selection.end);
    const after = content.substring(selection.end);
    const formatted = `<${headerType}>${selected}</${headerType}>`;
    const newContent = before + formatted + after;
    setContent(newContent);
    setCurrentNote({ ...currentNote, content: newContent });
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

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col">
      {showMathPopup && <MathPopup onCorrect={handleMathSolved} />}
      
      <Toolbar 
        currentNote={currentNote}
        handleTitleChange={handleTitleChange}
        handleSave={handleSave}
        handleNewNote={handleNewNote}
        isSaved={isSaved}
        bold={bold}
        italic={italic}
        size={size}
        onBoldToggle={handleBoldToggle}
        onItalicToggle={handleItalicToggle}
        onSizeChange={handleSizeChange}
        onHeaderFormat={formatSelectedHeader}  // <-- new prop
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
            onSelect={handleSelect}  // <-- track selection
            className={`w-full h-full p-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 resize-none text-gray-900 shadow-sm ${bold ? 'font-bold' : ''} ${italic ? 'italic' : ''} ${size === 'large' ? 'text-9xl' : size === 'small' ? 'text-[0.5rem]' : ''}`}
            placeholder="Write your thoughts here..."
          />
        </div>
      </div>

      <Footer content={content} />
    </div>
  );
};

export default Page;
