import './fonts/space age.ttf';
import ExpandPost from './Routes/ExpandPost';
import Home from './Routes/Home';
import Profile from './Routes/Profile';
import Register from './Routes/Register';
import Login from './Routes/Login';
import Posts from './components/Posts';
import LandingPage from './Routes/LandingPage';
import CreatePost from './Routes/CreatePost';
import { createTheme, ThemeProvider } from '@mui/material';
import { green } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './context';
import Feed from './Routes/Feed';
function App() {
  const { darkMode } = useGlobalContext();
  const light = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#62B6B7',
        white: '#FFFFFF',
        brand: '#1178f2',
        mainTrans: 'rgba(10, 25, 41, 0.8)',
      },
      secondary: {
        main: green[400],
      },
    },
    typography: {
      fontFamily: 'Euclid',
    },
  });
  const dark = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#62B6B7',
        white: '#FFFFFF',
        brand: '#1178f2',
        mainTrans: 'rgba(10, 25, 41, 0.8)',
      },
      secondary: {
        main: green[400],
      },
      background: {
        default: '#0f1720',
        paper: '#0B0B16',
      },
    },
    typography: {
      fontFamily: 'Euclid',
    },
  });
  return (
    <>
      <ThemeProvider theme={darkMode ? dark : light}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<LandingPage />} />
              <Route path=":main/:sub" element={<Posts />} />
              <Route path="profile" element={<Profile />} />
              <Route path="post" element={<CreatePost />} />
              <Route path="feed" element={<Feed />} />
              <Route path="expand">
                <Route path=":postId" element={<ExpandPost />}></Route>
              </Route>
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
