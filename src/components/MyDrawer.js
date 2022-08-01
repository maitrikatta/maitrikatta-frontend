import React from 'react';
import SideBarMenu from './SideBarMenu';
import { Drawer, Box } from '@mui/material';
import { useGlobalContext } from '../context';
export const drawerWidth = 250;

function MyDrawer() {
  const { handleDrawerToggle, mobileOpen } = useGlobalContext();
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="menu items"
    >
      {/* mobile drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        // PaperProps={{
        //   sx: { width: '60%' },
        // }}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <SideBarMenu />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            height: '100%',
            width: drawerWidth,
          },
        }}
        open={true}
      >
        <SideBarMenu />
      </Drawer>
    </Box>
  );
}

export default MyDrawer;
