import React from "react";
import { Icon } from "semantic-ui-react";
import { useLetterByLetter } from "../../hooks";
import { LetterByLetterProps } from "../../types";

const LetterByLetter = (props: LetterByLetterProps) => {
  const { letters, text } = useLetterByLetter(props);

  return (
    <p className="joazco--home-row-about-column-article-letter-by-letter">
      {letters}
      {text.length !== letters.length && <Icon name="i cursor" />}
    </p>
  );
};

export default LetterByLetter;
