import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { loginCredentials, setLoginCredentials, login, errorMessage } =
    useContext(AuthContext);
  const [passwordType, setPasswordType] = useState("password");

  //   function to onchange
  const handleOnChange = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleTogglePasswordType = (e) => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  //   function to handle login
  const handleLogin = (e) => {
    e.preventDefault();
    login();
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-6 w-full">
        <h1 className="text-xl font-semibold underline underline-offset-4">
          Login to Continue
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center w-1/2 space-y-6"
        >
          <div className="flex flex-col space-y-3 w-1/2">
            <input
              type="email"
              name="email"
              value={loginCredentials.email}
              onChange={handleOnChange}
              className="outline-none p-2 border-[1px] border-black rounded-md"
              placeholder="Enter your email"
              required
            />
            <div className="flex items-center justify-between px-2 border-[1px] border-black rounded-md">
              <input
                type={passwordType}
                name="password"
                value={loginCredentials.password}
                onChange={handleOnChange}
                className="outline-none py-2 rounded-md"
                placeholder="Set 8 character password"
                required
              />
              <span
                className="cursor-pointer"
                onClick={handleTogglePasswordType}
              >
                {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-md border-black bg-black hover:bg-white text-white hover:text-black duration-200 border-[1px] w-1/2"
          >
            Submit
          </button>
          {errorMessage.length !== 0 && (
            <span className="text-sm text-red-600">{errorMessage}</span>
          )}
          <div className="flex items-center justify-center space-x-4">
            <span>Already have an Account?</span>
            <Link
              to="/createAccount"
              className="text-blue-600 hover:underline hover:underline-offset-2 font-semibold"
            >
              create Account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
