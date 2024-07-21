import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/system';

const SideBarContainer = styled(Box)(({ theme }) => ({
  width: 240,
  height: '100vh',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(2),
  position: 'fixed',
  top: '64px', // Header'ın yüksekliğini dikkate alın
  left: 0,
  bottom: 0,
  overflowY: 'auto',
}));

const SideBar = () => (
  <SideBarContainer>
    <Typography variant="h6" gutterBottom>Account</Typography>
    <List>
      <ListItem button>
        <ListItemText primary="Communication" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Notes and Highlights" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Calendar Sync" />
      </ListItem>
    </List>
  </SideBarContainer>
);

export default SideBar;
