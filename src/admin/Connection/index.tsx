import React from "react";
import { Redirect } from "react-router-dom";
import { useJoazco } from "../../joazco";
import { Loader, SignInForm } from "./components";

const Connection = () => {
  const { logged, getCurrentUser, signIn } = useJoazco();

  if (logged === null) {
    getCurrentUser();
  }

  if (logged === null) {
    return <Loader />;
  }
  if (logged) {
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
