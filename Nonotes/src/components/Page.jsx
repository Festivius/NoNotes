import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Page = () => {
  const [content, setContent] = useState("");

  const handleContentChange = (value) => {
    setContent(value);
    console.log("Content:", value);
  };

  return (
    <div className="w-3/4 mx-auto">
      <div className="fixed top-0 left-0 w-full h-full flex flex-col">
      {/* Editor Toolbar */}
        <div className="bg-gray-200 p-2 border-b shadow-md">
          <h2 className="text-lg font-semibold">My Editor</h2>
        </div>

        {/* Quill Editor */}
        <div className="flex-1 overflow-hidden">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            className="h-full"
          />
        </div>
      </div>
    </div>
    
  );
};

export default Page;