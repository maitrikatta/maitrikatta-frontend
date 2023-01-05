import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Box,
  FormGroup,
  FormControlLabel,
  Typography,
} from '@mui/material';
import Switch from '@mui/material/Switch';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import list from '../Lists/sidebarList';
import { useGlobalContext } from '../context';
import { NavLink } from 'react-router-dom';
function SideBarMenu() {
  const { setDarkMode, darkMode } = useGlobalContext();
  const [activeListItem, setActiveListItem] = React.useState(null);
  const handleActiveList = (i) => {
    activeListItem === i ? setActiveListItem(null) : setActiveListItem(i);
  };
  const { handleDrawerToggle } = useGlobalContext();
  return (
    <>
      {/* dark theme toggle feature */}
      <Box
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', mt: 1, mb: 1 }}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode ? true : false}
                color="default"
                onChange={() => setDarkMode(!darkMode)}
              />
            }
            label="DARK THEME"
            sx={{
              '.MuiTypography-root': {
                fontFamily: 'Dosis',
                fontSize: 16,
                letterSpacing: '2px',
                pl: 1,
              },
            }}
          />
        </FormGroup>
      </Box>

      <Divider />

      {/* side bar list stuff */}
      <List>
        {list.map((item, index) => {
          return (
            <div key={index}>
              <ListItem
                selected={activeListItem === index}
                // divider={true}
                disablePadding
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.mainTrans',
                  },
                }}
              >
                <ListItemButton onClick={() => handleActiveList(index)}>
                  <ListItemIcon
                    sx={{
                      '&.MuiListItemIcon-root': {
                        color: activeListItem === index && 'primary.brand',
                      },
                    }}
                  >
                    {item.mainItemIcon}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      sx={{
                        fontFamily: 'Dosis',
                        letterSpacing: '2px',
                        '&.MuiTypography-root': {
                          color: activeListItem === index && 'primary.white',
                        },
                      }}
                    >
                      {item.mainItemText}
                    </Typography>
                  </ListItemText>
                  {activeListItem === index ? (
                    <RemoveIcon />
                  ) : (
                    <AddIcon
                      style={{
                        color: !darkMode
                          ? 'rgba(0, 0, 0, 0.5)'
                          : 'rgba(250, 250, 250, 0.5)',
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
              <Collapse
                timeout="auto"
                unmountOnExit
                in={activeListItem === index}
              >
                {/* sub items list  */}
                <List component="div">
                  {item.subItem.map((subItem, index) => {
                    return (
                      <NavLink
                        key={index}
                        to={subItem.path}
                        style={{ textDecoration: 'none' }}
                      >
                        <ListItem
                          onClick={handleDrawerToggle}
                          aria-label="yogesh"
                          disablePadding
                          inputprops={{
                            MenuProps: { disableScrollLock: true },
                          }}
                        >
                          <ListItemButton
                            sx={{
                              pl: 3,
                              '&.MuiListItemButton-root': { pr: 0 },
                            }}
                          >
                            <ListItemText>
                              <Typography
                                sx={{
                                  fontFamily: 'Dosis',
                                  letterSpacing: '2px',
                                  fontSize: '1rem',
                                  color: darkMode ? 'white' : 'black',
                                }}
                              >
                                {subItem.text}
                              </Typography>
                            </ListItemText>
                            <ListItemIcon>{subItem.subItemIcon}</ListItemIcon>
                          </ListItemButton>
                        </ListItem>
                      </NavLink>
                    );
                  })}
                </List>
              </Collapse>
            </div>
          );
        })}
      </List>
    </>
  );
}

export default SideBarMenu;
