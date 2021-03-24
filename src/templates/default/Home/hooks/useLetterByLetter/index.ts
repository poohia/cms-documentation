import { useState, useEffect } from "react";
import { LetterByLetterProps } from "../../types";

const useLetterByLetter = ({ text }: LetterByLetterProps) => {
  const [letters, setLetters] = useState<string>("");

  const letter = text[letters.length];
  if (text.length !== letters.length && letter) {
    setTimeout(() => {
      setLetters(`${letters}${letter}`);
    }, 30);
  }

  useEffect(() => {
    setLetters("");
  }, [text]);

  return { letters, text };
};

export default useLetterByLetter;
