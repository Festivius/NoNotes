import React from "react";

const Footer = ({ content }) => {
  return (
    <div className="bg-gray-100 p-3 border-t border-gray-200 flex justify-between items-center font-comic-sans">
      <div className="text-gray-700 text-sm">
        {content.length} characters
      </div>
    </div>
  );
};

export default Footer;