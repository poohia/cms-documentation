import React from "react";
import { LoadContent, LoadContainer } from "../../styles";

const Load = () => (
  <LoadContent className="joazco--signin-loader-content">
    <LoadContainer className="joazco--signin-loader-container">
      <div>Loading....</div>
    </LoadContainer>
  </LoadContent>
);

export default Load;
