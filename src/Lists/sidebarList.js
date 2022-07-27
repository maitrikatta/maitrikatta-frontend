import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import LaptopChromebookOutlinedIcon from '@mui/icons-material/LaptopChromebookOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import Geo from '../assets/icons/geo';
import Art from '../assets/icons/art';
import Movie from '../assets/icons/movie';
import Sport from '../assets/icons/sport';
const list = [
  {
    mainItemText: 'Agriculture',
    mainItemIcon: <AgricultureOutlinedIcon />,
    subItem: [
      { text: 'Globe', path: 'Agriculture/Globe' },
      { text: 'Machines', path: 'Agriculture/Machines' },
      { text: 'Crops', path: 'Agriculture/Crops' },
    ],
  },
  {
    mainItemText: 'Education',
    mainItemIcon: <SchoolOutlinedIcon />,
    subItem: [
      {
        text: 'Science',
        path: 'Education/Science',
        subItemIcon: <ScienceOutlinedIcon />,
      },
      {
        text: 'Computer',
        path: 'Education/Computer',
        subItemIcon: <LaptopChromebookOutlinedIcon />,
      },
      { text: 'Arts', path: 'Education/Arts', subItemIcon: <Art /> },
    ],
  },
  {
    mainItemText: 'World',
    mainItemIcon: <LanguageOutlinedIcon />,
    subItem: [
      {
        text: 'Geopolitics',
        subItemIcon: <Geo fontSize="medium" />,
        path: 'World/Geopolitics',
      },
      {
        text: 'News',
        subItemIcon: <NewspaperOutlinedIcon />,
        path: 'World/News',
      },
      {
        text: 'Trade',
        subItemIcon: <CurrencyRupeeOutlinedIcon />,
        path: 'World/Trade',
      },
    ],
  },
  {
    mainItemText: 'Entertainment',
    mainItemIcon: <LiveTvOutlinedIcon />,
    subItem: [
      {
        text: 'Movies',
        subItemIcon: <Movie />,
        path: 'Entertainment/Movies',
      },
      { text: 'Sport', subItemIcon: <Sport />, path: 'Entertainment/Sport' },
      { text: 'Celebrities', path: 'Entertainment/Celebrities' },
    ],
  },
  {
    mainItemText: 'Technology',
    mainItemIcon: <LaptopChromebookOutlinedIcon />,
    subItem: [
      { text: 'Mobiles & Laptops', path: 'Technology/mobile-and-laptop' },
      { text: 'Accessories', path: 'Technology/accessories' },
      { text: 'Blogs', path: 'Technology/blogs' },
    ],
  },
];

export default list;
