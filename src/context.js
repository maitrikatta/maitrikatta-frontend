import React, { useContext, useEffect, useState } from 'react';

const AppContext = React.createContext();
export function AppProvider({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [darkMode, setDarkMode] = useState();
  const [appBarHeight, setAppBarHeight] = useState();

  //select localStorage choice
  useEffect(() => {
    const storedThemeChoice = localStorage.getItem('darkMode');
    if (storedThemeChoice === 'true') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  //change localStorage choice
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        appBarHeight,
        setAppBarHeight,
        mobileOpen,
        handleDrawerToggle,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};
