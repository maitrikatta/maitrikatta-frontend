import './fonts/space age.ttf';
// import Home from './Routes/test';
import Home from './Routes/Home';
import { createTheme, ThemeProvider } from '@mui/material';
import Register from './Routes/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Posts from './components/Posts';
import { useGlobalContext } from './context';
function App() {
  const { darkMode } = useGlobalContext();
  const homeTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1178f2',
        icons: 'white',
      },
      secondary: {
        main: '#fafafa',
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={homeTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path=":main/:sub" element={<Posts />} />
              <Route path="profile" element={<h2>Profile area</h2>} />
            </Route>
            <Route path="register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
