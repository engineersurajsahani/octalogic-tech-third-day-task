import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Divider, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Sidebar = ({ isOpen, toggleSidebar, drawerWidth, toggleTheme, darkMode }) => (
  <Drawer
    variant="temporary"  // Changed to "temporary" to overlay the sidebar
    open={isOpen}
    onClose={toggleSidebar}  // Allows closing the drawer when clicking outside or via the close button
    sx={{
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}
  >
    <div>
      <IconButton onClick={toggleSidebar}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <Divider />
    <List className='mt-5'>
      <ListItem button>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Employee Panel" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="About" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Contact" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Settings" />
      </ListItem>
    </List>
    <Button
      onClick={toggleTheme}
      variant="contained"
      sx={{ margin: '16px', float: 'right' }}
    >
      Toggle {darkMode ? 'Light' : 'Dark'} Mode
    </Button>
  </Drawer>
);

export default Sidebar;
