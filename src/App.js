import './fonts/space age.ttf';
// import Home from './Routes/test';
import Home from './Routes/Home';
import Profile from './Routes/Profile';
import Register from './Routes/Register';
import Login from './Routes/Login';
import Posts from './components/Posts';
import LandingPage from './components/LandingPage';
import CreatePost from './Routes/CreatePost';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './context';
function App() {
  const { darkMode } = useGlobalContext();
  const homeTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1178f2',
        mainTrans: 'rgba(10, 25, 41, 0.8)',
        white: '#FFFFFF',
        brand: '#1178f2',
      },
      secondary: {
        main: '#0a1929',
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={homeTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<LandingPage />} />
              <Route path=":main/:sub" element={<Posts />} />
              <Route path="profile" element={<Profile />} />
              <Route path="post" element={<CreatePost />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
// cooment
export default App;
