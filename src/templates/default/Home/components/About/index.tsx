import React from "react";
import { Grid, Header } from "semantic-ui-react";
import { Props } from "../../types";
import LetterByLetter from "../LetterByLetter";

const About = ({ description }: Pick<Props, "description">) => {
  if (description === "") {
    return <div />;
  }
  return (
    <Grid.Row
      columns={1}
      className="joazco--home-grid-row joazco--home-row-about"
    >
      <Grid.Column className="joazco--home-grid-column joazco--home-row-about-column">
        <article className="joazco--home-row-about-column-article">
          <Header
            as="h2"
            className="joazco--home-row-about-column-article-header"
          >
            About us
          </Header>
          <LetterByLetter text={description} />
        </article>
      </Grid.Column>
    </Grid.Row>
  );
};

export default About;
