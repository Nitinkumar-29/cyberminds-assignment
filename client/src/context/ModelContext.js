import { createContext, useState } from "react";

const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [modelDisplay, setModelDisplay] = useState("hidden");
  //   toggle display
  const toggleDisplay = () => {
    if (modelDisplay === "hidden") {
      setModelDisplay("flex");
    } else {
      setModelDisplay("hidden");
    }
  };
  return (
    <ModelContext.Provider
      value={{ toggleDisplay, modelDisplay, setModelDisplay }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export default ModelContext;
