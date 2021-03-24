import { useState } from "react";
import { useConfig } from "../../joazco";

const useConnection = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { icon } = useConfig();

  return {
    email,
    password,
    icon,
    setEmail,
    setPassword,
  };
};

export default useConnection;
