import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Container, TextField, MenuItem, Typography, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';
import MenuHeader from '../menu/MenuHeader'; 
import SideMenuAccount from './SideMenuAccount';
import { updateProfile, toggleDarkMode } from '../../actions'; 
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

const languages = [
  { value: 'en', label: 'English' },
  { value: 'tr', label: 'Türkçe' },
];

const timezones = [
  { value: 'Los Angeles', label: 'Los Angeles' },
  { value: 'New York', label: 'New York' },
];

const Profile = () => {
  const user = useSelector(state => state.auth.user);
  const [fullName, setFullName] = useState(user ? user.username : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [timezone, setTimezone] = useState('Los Angeles');
  const [language, setLanguage] = useState('en');
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#fff"
      },
      text: {
        primary: darkMode ? "#fff" : "#000"
      },
    },
  });

  const ProfileContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(4),
  }));

  const ProfileForm = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: theme.spacing(2),
  }));

  const handleSave = () => {
    dispatch(updateProfile({ username: fullName, email, timezone, language }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
          backgroundColor: darkMode ? "background.default" : "background.paper",
          color: darkMode ? "text.primary" : "text.primary",
          padding: 1,
          borderRadius: 1,
          boxShadow: 3,
        }}>
      <MenuHeader />
      <Box sx={{ display: 'flex' }}>
        <SideMenuAccount/>
        <Box sx={{ flexGrow: 1, padding: 3, marginLeft: '240px', marginTop: '64px' }}>
          <Box sx={{ position: "absolute", top: "80px" }}>
            <Button onClick={() => dispatch(toggleDarkMode())}>
              <SettingsBrightnessIcon sx={{ mr: 0.5 }} />{" "}
              {darkMode ? "Dark Mode" : "Light Mode"}
            </Button>
          </Box>
          <ProfileContainer >
            <Typography variant="h4">My Account</Typography>
            <ProfileForm>
              <TextField
                label="Username"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                margin="normal"
                fullWidth
              />
              <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: 16 }}>
                Submit
              </Button>
            </ProfileForm>
          </ProfileContainer>
        </Box>
      </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;
