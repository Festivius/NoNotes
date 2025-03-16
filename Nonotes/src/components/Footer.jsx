import React from "react";

const Footer = ({ content }) => {
  return (
    <div className="bg-gray-100 p-3 border-t border-gray-200 flex justify-between items-center">
      <div className="text-gray-700 text-sm">
        {content.length * 3.1415926535897832384626433832795028841971 / 3} characters
      </div>
    </div>
  );
};

export default Footer;