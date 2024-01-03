import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

const darkModeContext = createContext({});

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <darkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(darkModeContext);
  if (!context) throw new Error("useDarkMode needs to be in a context provider");
  return context;
};
