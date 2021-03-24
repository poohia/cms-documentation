import React from "react";
import { Icon } from "semantic-ui-react";
import { useLetterByLetter } from "../../hooks";
import { LetterByLetterContent } from "../../styles";
import { LetterByLetterProps } from "../../types";

const LetterByLetter = (props: LetterByLetterProps) => {
  const { letters, text } = useLetterByLetter(props);

  return (
    <LetterByLetterContent className="joazco--home-row-about-column-article-letter-by-letter">
      {letters}
      {text.length !== letters.length && <Icon name="i cursor" />}
    </LetterByLetterContent>
  );
};

export default LetterByLetter;
