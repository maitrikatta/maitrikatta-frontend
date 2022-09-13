import React, { useContext, useEffect, useState } from 'react';

const AppContext = React.createContext();
export function AppProvider({ children }) {
  // STATE FOR SIDEBAR OPEN
  const [mobileOpen, setMobileOpen] = useState(false);

  // SIDEBAR STATE HANDLER
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //DARK THEME CHECKBOX
  const [darkMode, setDarkMode] = useState();

  //STORE APPBAR HEIGHT TO COMPUTE REST OF VIEWPORT
  const [appBarHeight, setAppBarHeight] = useState();

  //SELECT LOCALSTORAGE CHOICE OF THEME
  useEffect(() => {
    const storedThemeChoice = localStorage.getItem('darkMode');
    if (storedThemeChoice === 'true') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  //CHANGE LOCALSTORAGE CHOICE ACCORDING TO USER
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        appBarHeight,
        mobileOpen,
        darkMode,
        setAppBarHeight,
        handleDrawerToggle,
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
