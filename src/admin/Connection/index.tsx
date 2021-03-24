import React from "react";
import { Redirect } from "react-router-dom";
import { useConnection as useConnectionJoazco } from "../../joazco";
import { Loader, SignInForm } from "./components";

const Connection = () => {
  const { loading, data: user, signIn } = useConnectionJoazco();

  if (loading) {
    return <Loader />;
  }
  if (user) {
    return <Redirect to="/joazco-admin" />;
  }
  return (
    <SignInForm
      submit={(email, password) => {
        signIn(email, password).catch(() => {
          window.alert("Joazco::: Signin fail");
        });
      }}
    />
  );
};

export default Connection;
