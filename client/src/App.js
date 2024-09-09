import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import CreateAccount from "./authentication/CreateAccount";
import Login from "./authentication/Login";
import { JobProvider } from "./context/JobContext";
import { ModelProvider } from "./context/ModelContext";

function App() {
  return (
    <>
      <Router>
        <ModelProvider>
          <AuthProvider>
            <JobProvider>
              <Navbar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                  exact
                  path="/createAccount"
                  element={<CreateAccount />}
                />
                <Route exact path="/login" element={<Login />} />
              </Routes>
            </JobProvider>
          </AuthProvider>
        </ModelProvider>
      </Router>
    </>
  );
}

export default App;
