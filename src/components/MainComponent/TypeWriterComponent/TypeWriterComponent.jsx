import React, { useEffect, useState } from 'react'

const TypeWriterComponent = ({ text, speed = 200 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      if (index < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + text[index]);
          setIndex((prev) => prev + 1);
        }, speed);
  
        return () => clearTimeout(timeout);
      }
    }, [index, text, speed]);
  
    return (
      <h1 className='app-title'>
        {displayedText}
      </h1>
    );
}

export default TypeWriterComponent
