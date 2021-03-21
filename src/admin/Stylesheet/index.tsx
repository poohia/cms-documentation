import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Grid, Header, Icon, Form, TextArea } from "semantic-ui-react";
import { ButtonSuccess } from "../../styled-components";
import Loader from "../Loader";
import useStylesheet from "./useStylesheet";
import { StylesheetContent } from "./styles";

const Stylesheet = () => {
  const {
    loadingConnection,
    user,
    driver,
    loadingStylesheet,
    css,
    checkCss,
    canSave,
    setCss,
    insertStylesheet,
  } = useStylesheet();

  if (loadingConnection) {
    return <Loader />;
  }

  if (!user) {
    return <Redirect to="/joazco-connection" />;
  }

  return (
    <StylesheetContent>
      <Header as="h1">
        Custom stylesheet
        <Header.Subheader>Add your custom stylesheet</Header.Subheader>
      </Header>
      <p>
        <Link
          to={driver !== "localstorage" ? "/?liveChange=true" : "/"}
          target="_blank"
        >
          Live change&nbsp;
          <Icon name="external" />
        </Link>
      </p>
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <span>
              All html tag have class name started by joazco--
              <br />
              Just use your DevTools &nbsp;
              <code>F12</code>
              <br />
              You have access to variables css which are initiated from the
              .env.dev file :
              <br />
              <code>
                --primary --secondary --success --warning --danger --black
                --background-body --background-color-menu --font-size
              </code>
            </span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={13}>
            <Form>
              <TextArea
                placeholder="Write your custom css"
                rows={15}
                value={css}
                onChange={(e) => setCss(e.target.value)}
              />
            </Form>
          </Grid.Column>
          <Grid.Column width={3}>
            <p>Ouput :</p>
            <p>{checkCss}</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <ButtonSuccess
              fluid
              disabled={!canSave}
              onClick={() => insertStylesheet(css)}
              loading={loadingStylesheet}
            >
              Valider
            </ButtonSuccess>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </StylesheetContent>
  );
};

export default Stylesheet;
