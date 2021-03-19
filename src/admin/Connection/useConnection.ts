import { useState } from "react";
import { useJoazco } from "../../joazco";

const useConnection = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loadingSignIn, icon } = useJoazco();

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
