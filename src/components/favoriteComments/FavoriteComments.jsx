import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Container, TextField, MenuItem,ThemeProvider, createTheme,
    Typography,
    Modal,
    CssBaseline,
    Pagination,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Collapse,
    IconButton, } from '@mui/material';
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

const FavoriteComments = () => {
  const user = useSelector(state => state.auth.user);
  const [fullName, setFullName] = useState(user ? user.username : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [timezone, setTimezone] = useState('Los Angeles');
  const [language, setLanguage] = useState('en');
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const [userList, setUserList] = useState(() => {
        return JSON.parse(localStorage.getItem("userList")) || [];
  });
    const [filteredUsers, setFilteredUsers] = useState(userList);

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
  
    const filteredUsers = userList.filter((user) => {
      const username = user.username ? user.username.toLowerCase() : "";
      const email = user.email ? user.email.toLowerCase() : "";
      const city = user.city ? user.city.toLowerCase() : "";
      const infoText = user.infoText ? user.infoText.toLowerCase() : "";
  
      return (
        username.includes(searchText) ||
        email.includes(searchText) ||
        city.includes(searchText) ||
        infoText.includes(searchText)
      );
    });
  
    setFilteredUsers(filteredUsers);
    setCurrentPage(1); 
  };
  

  useEffect(() => {
    setFilteredUsers(userList);
  }, [userList]);

const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );  


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
        <Box sx={{ flexGrow: 1, padding: 3, marginLeft: '300px', marginTop: '64px' }}>
          <Box sx={{ position: "absolute", top: "80px" }}>
            <Button onClick={() => dispatch(toggleDarkMode())}>
              <SettingsBrightnessIcon sx={{ ml: 0.5 }} />{" "}
              {darkMode ? "Dark Mode" : "Light Mode"}
            </Button>
          </Box>
          <ProfileContainer >
            <Typography variant="h4">Favorite Comments</Typography>
            <Box sx={{ width: '95%', maxHeight: '600px', overflow: 'auto', margin: 'auto' }}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Info Text</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Box>
          </ProfileContainer>
        </Box>
      </Box>
      </Box>
    </ThemeProvider>
  );
};

export default FavoriteComments;
