import { useState } from "react";
import { useJazzi } from "../../joazco";

const useConnection = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loadingSignIn, icon } = useJazzi();

  return {
    email,
    password,
    loadingSignIn,
    icon,
    setEmail,
    setPassword,
  };
};

export default useConnection;
