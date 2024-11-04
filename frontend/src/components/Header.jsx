import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ toggleSidebar }) => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        Admin Dashboard
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
