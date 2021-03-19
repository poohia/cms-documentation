import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Header, Dropdown, Input, Icon } from "semantic-ui-react";
import { ButtonSuccess, Form, FormInput, Label } from "../../styled-components";
import Loader from "../Loader";
import { HomeContent, HomeFiveIcon, HomeIcon } from "./styles";
import useHome from "./useHome";

const Home = () => {
  const {
    driver,
    logged,
    icon,
    loadingSeo,
    seo: { title, description, keywords, links, favIcon },
    fetchSeo,
    setTitle,
    setDescription,
    setKeywords,
    setWebSite,
    setgit,
    setFavIcon,
  } = useHome();
  if (logged === null || loadingSeo === null) {
    return <Loader />;
  }
  if (!logged) {
    return <Redirect to="/joazco-connection" />;
  }

  return (
    <HomeContent>
      <Header as="h1">
        SEO
        <Header.Subheader>Information of your documentation</Header.Subheader>
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
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          fetchSeo();
        }}
      >
        <Form.Field>
          <Label required>
            <span>Icon</span>
            <Form.Group>
              <Form.Field width="12">
                <FormInput
                  error={{
                    content: "Insert into .env.local file",
                  }}
                  type="text"
                  value={icon}
                  disabled
                />
              </Form.Field>
              <Form.Field width="4">
                <HomeIcon src={icon} alt={`Logo of ${title}`} />
              </Form.Field>
            </Form.Group>
          </Label>
        </Form.Field>
        <Form.Field>
          <Label>
            <span>Favicon</span>
            <Form.Group>
              <Form.Field width="12">
                <input
                  type="text"
                  value={favIcon || ""}
                  onChange={(e) => setFavIcon(e.target.value)}
                />
              </Form.Field>
              <Form.Field width="4">
                {favIcon && (
                  <HomeFiveIcon src={favIcon} alt={`Favicon of ${title}`} />
                )}
              </Form.Field>
            </Form.Group>
          </Label>
        </Form.Field>
        <Form.Field>
          <Label required>
            <span>Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Label>
        </Form.Field>
        <Form.Field>
          <Label required>
            <span>Description</span>
            <Form.TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Label>
        </Form.Field>
        <Form.Field>
          <Label>
            <span>Keywords</span>
            <Dropdown
              options={keywords.split(",").map((keyword) => ({
                text: keyword,
                value: keyword,
              }))}
              value={keywords !== "" && keywords.split(",")}
              search
              selection
              fluid
              multiple
              allowAdditions
              onChange={(_e, { value }) => setKeywords(value as string[])}
            />
          </Label>
        </Form.Field>
        <hr />
        <Header as="h2">Links</Header>
        <Form.Group widths="equal">
          <Form.Field>
            <Input
              icon="linkify"
              iconPosition="left"
              placeholder="Site Url"
              value={links.website}
              onChange={(e) => setWebSite(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Input
              icon="git"
              iconPosition="left"
              placeholder="git Url"
              value={links.git}
              onChange={(e) => setgit(e.target.value)}
            />
          </Form.Field>
        </Form.Group>
        <ButtonSuccess
          type="submit"
          fluid
          loading={loadingSeo}
          onClick={() => fetchSeo()}
        >
          Submit
        </ButtonSuccess>
      </Form>
    </HomeContent>
  );
};

export default Home;
