import React from "react";

const Footer = ({ content }) => {
  return (
    <div className="bg-amber-100 p-3 border-t border-amber-200 flex justify-between items-center">
      <div className="text-amber-700 text-sm">
        {content.length} characters
      </div>
      <div className="flex space-x-2">
        <button className="px-3 py-1 rounded-md bg-amber-200 text-amber-700 hover:bg-amber-300 transition-colors text-sm">
          Settings
        </button>
      </div>
    </div>
  );
};

export default Footer;