import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import DraftsIcon from '@mui/icons-material/Drafts';
import MailIcon from '@mui/icons-material/Mail';

const SideBarContainer = styled(Box)(({ theme }) => ({
  width: 270,
  height: '100vh',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(2),
  position: 'fixed',
  top: '75px',
  left: 0,
  bottom: 0,
  overflowY: 'auto',
}));

const SideBar = () => (
  <SideBarContainer>
    <List>
      <ListItem button>
        <ListItemIcon>
          <DraftsIcon />  
        </ListItemIcon>
        <ListItemText primary="My Comments" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="Commenters" />
      </ListItem>
    </List>
  </SideBarContainer>
);

export default SideBar;
