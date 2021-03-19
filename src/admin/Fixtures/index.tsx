import React from "react";
import { Button } from "semantic-ui-react";
import { AdminContainer } from "../../styles";
import useFixtures from "./useFixtures";

const Fixtures = () => {
  const {
    loading,
    menusJoazco,
    loadFixutres,
    configMenus,
    resetDatabase,
  } = useFixtures();
  return (
    <AdminContainer>
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
