import React, { useContext, useState } from 'react';

const AppContext = React.createContext();
export function AppProvider({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [darkMode, setDarkMode] = useState(false);
  return (
    <AppContext.Provider
      value={{ mobileOpen, handleDrawerToggle, darkMode, setDarkMode }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};
