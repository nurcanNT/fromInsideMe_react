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
    <Typography variant="h6" gutterBottom>Hesap</Typography>
    <List>
      <ListItem button>
        <ListItemText primary="İletişim Tercihleri" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Notlar ve Öne Çıkanlar" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Takvim Senkronizasyonu" />
      </ListItem>
    </List>
  </SideBarContainer>
);

export default SideBar;
