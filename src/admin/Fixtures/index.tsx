import React from "react";
import { Redirect } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { AdminContainer } from "../../styles";
import Loader from "../Loader";
import useFixtures from "./useFixtures";

const Fixtures = () => {
  const {
    loadingConnection,
    user,
    loading,
    menusJoazco,
    loadFixutres,
    configMenus,
    resetDatabase,
  } = useFixtures();
  if (loadingConnection) {
    return <Loader />;
  }
  if (!user) {
    return <Redirect to="/joazco-connection" />;
  }

  return (
    <AdminContainer>
      <p>
        Click to &#34;Reset database&#34; wait window reload, click to &#34;Load
        fixtures&#34; wait window reload and click to &#34;Config Menu&#34; wait
        window reload
      </p>
      <Button
        onClick={() => {
          resetDatabase();
        }}
        loading={loading}
      >
        Reset database
      </Button>
      <Button
        onClick={() => {
          loadFixutres();
        }}
        loading={loading}
        disabled={menusJoazco.length > 0}
      >
        Load fixtures
      </Button>
      <Button
        onClick={() => {
          configMenus();
        }}
        loading={loading}
        disabled={menusJoazco.length === 0}
      >
        Config Menu
      </Button>
    </AdminContainer>
  );
};

export default Fixtures;
