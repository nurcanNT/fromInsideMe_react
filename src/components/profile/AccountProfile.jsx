import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Container, TextField, MenuItem, Typography, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';
import MenuHeader from '../menu/MenuHeader'; 
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

const AccountProfile = () => {
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
      <Box sx={{padding: 1}}>
        <Box sx={{ position: "absolute", top: "80px" }}>
            <Button onClick={() => dispatch(toggleDarkMode())}>
              <SettingsBrightnessIcon sx={{ mr: 0.5 }} />{" "}
              {darkMode ? "Dark Mode" : "Light Mode"}
            </Button>
          </Box>
        <MenuHeader />
        <ProfileContainer>
          <Typography variant="h4">Hesap</Typography>
          <ProfileForm>
            <TextField
              label="Tam adı"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Email Adresi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              select
              label="Timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              margin="normal"
              fullWidth
            >
              {timezones.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Dil"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              margin="normal"
              fullWidth
            >
              {languages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: 16 }}>
              Kaydet
            </Button>
          </ProfileForm>
        </ProfileContainer>
      </Box>
    </ThemeProvider>
  );
};

export default AccountProfile;
