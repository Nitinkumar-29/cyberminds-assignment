import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = new createContext();

export const AuthProvider = ({ children }) => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [createAccountCredentials, setCreateAccountCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const host = "http://localhost:8000";

  //   function to create account
  const createAccount = async () => {
    const { name, email, password } = createAccountCredentials;
    try {
      const response = await fetch(`${host}/api/auth/createAccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        setErrorMessage("Cloud not process");
        return console.error(response);
      }
      const data = await response.json();
      localStorage.setItem("token", data.authToken);
      console.log(data);
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage(error?.message);
    }
  };

  //   login handle
  const login = async () => {
    const { email, password } = loginCredentials;
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        setErrorMessage("Invalid credentials");
        return console.error(response);
      }
      const data = await response.json();
      localStorage.setItem("token", data.authToken);
      console.log(data);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        createAccount,
        loginCredentials,
        setLoginCredentials,
        createAccountCredentials,
        setCreateAccountCredentials,
        errorMessage,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
