import React, { useContext, useEffect, useState } from 'react';

const AppContext = React.createContext();
export function AppProvider({ children }) {
  // MAINTAIN POSTS LIST
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

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
    } else if (storedThemeChoice == null) {
      // first fresh visit, when no choice made
      setDarkMode(true); // default theme
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
        posts,
        pageNo,
        isLoadingPosts,
        setPageNo,
        setIsLoadingPosts,
        setPosts,
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
