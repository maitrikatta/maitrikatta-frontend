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
import Switch, { SwitchProps } from '@mui/material/Switch';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
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
              <Switch color="default" onChange={() => setDarkMode(!darkMode)} />
            }
            label="DARK THEME"
            sx={{
              '.MuiTypography-root': {
                fontFamily: 'apollo',
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
                divider={true}
                disablePadding
              >
                <ListItemButton onClick={() => handleActiveList(index)}>
                  <ListItemIcon
                    sx={{
                      '.MuiListItemIcon-root': {
                        color: 'rgba(0, 0, 0, 0.9)',
                      },
                    }}
                  >
                    {item.mainItemIcon}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      sx={{
                        fontFamily: 'apollo',
                        letterSpacing: '2px',
                      }}
                    >
                      {item.mainItemText}
                    </Typography>
                  </ListItemText>
                  {activeListItem === index ? (
                    <ExpandLess />
                  ) : (
                    <ExpandCircleDownOutlinedIcon
                      style={{
                        color: !darkMode
                          ? 'rgba(0, 0, 0, 0.6)'
                          : 'rgba(250, 250, 250, 0.6)',
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
                        >
                          <ListItemButton
                            sx={{
                              pl: 3,
                              '&.MuiListItemButton-root': { pr: 0 },
                            }}
                            dense={true}
                          >
                            <ListItemText>
                              <Typography
                                sx={{
                                  fontFamily: 'apollo',
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
