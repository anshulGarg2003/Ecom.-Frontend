import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TypingAnimation = ({ text }) => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setTypedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        // Animation completed, reset states to start again
        setTypedText("");
        setCurrentIndex(0);
      }
    }, 900);

    return () => clearInterval(interval);
  }, [text, currentIndex]);

  return <StyledDiv>{typedText}</StyledDiv>;
};

const StyledDiv = styled.div`
  display: inline-block;
  overflow: hidden; /* Hide overflow to create typing effect */
  white-space: nowrap; /* Prevent text from wrapping */
  transition: width 0.9s ease-in-out;
`;

export default TypingAnimation;
