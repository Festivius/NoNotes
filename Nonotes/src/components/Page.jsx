import React, { useState } from 'react';

const Page = () => {
  const [note, setNote] = useState('Notoes\nName    Date\n(...write away)\nskkabiaiaiia bomb err');

  const handleChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="h-full aspect-[8.5/11] border-black border-2 p-[3%]">
        <textarea
          className="h-full w-full resize-none cursor-text focus:outline-none"
          value={note}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Page;
