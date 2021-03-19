import React from "react";
import { Grid, Header, Icon } from "semantic-ui-react";
import { Card } from "../../../../../styled-components";
import { useLinks } from "../../hooks";
import { CardGroupLinks } from "../../styles";
import { Props } from "../../types";

const Links = (props: Pick<Props, "links">) => {
  const { showLinks, website, git, isLink } = useLinks(props);

  if (!showLinks) {
    return <div />;
  }
  return (
    <Grid.Row
      columns={1}
      className="joazco--home-grid-row joazco--home-row-links"
    >
      <Grid.Column className="joazco--home-grid-column joazco--home-row-links-column">
        <Header as="h2" className="joazco--home-row-links-header">
          Follow us
        </Header>
        <CardGroupLinks className="joazco--home-row-links-column-card-group">
          {isLink(website) && (
            <Card
              href={website}
              target="_blank"
              className="joazco--home-row-links-column-card-group-card-website"
            >
              <Card.Content className="joazco--home-row-links-column-card-group-card-website-content">
                <Card.Header className="joazco--home-row-links-column-card-group-card-website-content-header">
                  <Icon
                    name="linkify"
                    className="joazco--home-row-links-column-card-group-card-website-content-icon"
                  />
                  &nbsp;
                  <span className="joazco--home-row-links-column-card-group-card-website-content-span">
                    Website
                  </span>
                </Card.Header>
                <Card.Description className="joazco--home-row-links-column-card-group-card-website-content-description">
                  {website}
                </Card.Description>
              </Card.Content>
            </Card>
          )}
          {isLink(git) && (
            <Card
              href={git}
              target="_blank"
              className="joazco--home-row-links-column-card-group-card-git"
            >
              <Card.Content className="joazco--home-row-links-column-card-group-card-git-content">
                <Card.Header className="joazco--home-row-links-column-card-group-card-git-content-header">
                  <Icon
                    name="git"
                    className="joazco--home-row-links-column-card-group-card-git-content-icon"
                  />
                  &nbsp;
                  <span className="joazco--home-row-links-column-card-group-card-git-content-span">
                    Git
                  </span>
                </Card.Header>
                <Card.Description className="joazco--home-row-links-column-card-group-card-git-content-description">
                  {git}
                </Card.Description>
              </Card.Content>
            </Card>
          )}
        </CardGroupLinks>
      </Grid.Column>
    </Grid.Row>
  );
};

export default Links;
