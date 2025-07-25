import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const navItems = ['Home', 'FAQs'];

const Header = () => {
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between', gap: 4 }}>
        
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          Tasky
        </Typography>

        
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          {navItems.map((item) => (
            <Button key={item} color="inherit" href={`#${item.toLowerCase()}`}>
              {item}
            </Button>
          ))}
        </Box>

        
        <Button variant="contained" href="/Login" sx={{ textTransform: 'none' }}>
          Start Tasking
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
