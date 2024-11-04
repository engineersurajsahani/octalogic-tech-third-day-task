import React, { useState } from 'react';
import { CssBaseline, Box, Toolbar, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EmployeePanel from './components/EmployeePanel';

const drawerWidth = 240;

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => setDarkMode(!darkMode);

  // Create a theme instance
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header toggleSidebar={toggleSidebar} drawerWidth={drawerWidth} />

        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          drawerWidth={drawerWidth}
          toggleTheme={toggleTheme}
          darkMode={darkMode}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: isSidebarOpen ? `${drawerWidth}px` : 0,
            transition: (theme) =>
              theme.transitions.create(['margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
          }}
        >
          <Toolbar />
          <Container maxWidth="lg">
            <EmployeePanel />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
