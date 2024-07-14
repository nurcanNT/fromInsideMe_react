import React, { useState, useEffect, useRef } from "react";
import { Button, TextField, Typography, Box, Modal, createTheme, ThemeProvider, CssBaseline  } from "@mui/material";
import MenuHeader from "../menu/MenuHeader";
import { styles } from "./ListStyle";
import EmailInput from "../EmailInput";
import { useDispatch, useSelector } from 'react-redux';
import { create, addUser } from "../../actions";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { toggleDarkMode } from "../../actions.js";

const ListPage = () => {
  const [userList, setUserList] = useState(() => {
    return JSON.parse(localStorage.getItem("userList")) || [];
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.auth.user?.email);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#fff",
        paper: darkMode ? "#333" : "#fff",
      },
      text: {
        primary: darkMode ? "#fff" : "#000"
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#333" : "#fff",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: darkMode ? "#fff" : "#000",
            },
          },
          input: {
            color: darkMode ? "#fff" : "#000",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: darkMode ? "#fff" : "#000",
          },
        },
      },
    },
  });

  const updatedStyles = {
    ...styles,
    columnHeader: {
      ...styles.columnHeader,
      backgroundColor: darkMode ? "#333" : "#f0f0f0",
      color: darkMode ? "#fff" : "#000",
    },
    cell: {
      ...styles.cell,
      color: darkMode ? "#fff" : "#000",
    },
  };

  const [formData, setFormData] = useState({
    rumuz: "",
    email: userEmail || "",
    city: "",
    infoText: "",
  });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(userList));
  }, [userList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = () => {
    if (userEmail) {
      dispatch(create(userEmail));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserList = [...userList, formData];
    setUserList(newUserList);
    setFormData({ rumuz: "", email: userEmail || "", city: "", infoText: "" });
    setOpenModal(false);
    setFilteredUsers(newUserList);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredUsers = userList.filter(
      (user) =>
        user.rumuz.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.city.toLowerCase().includes(searchText) ||
        user.infoText.toLowerCase().includes(searchText)
    );
    setFilteredUsers(filteredUsers);
  };

  useEffect(() => {
    setFilteredUsers(userList);
  }, [userList]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: "absolute", top: "60px" }}>
        <Button onClick={() => dispatch(toggleDarkMode())}>
          <SettingsBrightnessIcon sx={{ mr: 0.5 }} />{" "}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </Box>
      <Box sx={{
          backgroundColor: darkMode ? "background.default" : "background.paper",
          color: darkMode ? "text.primary" : "text.primary",
          padding: 1,
          borderRadius: 1,
          boxShadow: 3,
        }}>
        <MenuHeader />
        <Box sx={{ marginLeft: "80%", marginTop: "1rem" }}>
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            List Create
          </Button>
        </Box>

        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h4" id="modal-modal-title" gutterBottom>
              Create New User
            </Typography>
            <form onSubmit={handleSubmit} id="user-form">
              <Box>
                <label htmlFor="rumuz">Rumuz:</label>
                <TextField
                  sx={{ width: "100%" }}
                  type="text"
                  id="rumuz"
                  name="rumuz"
                  value={formData.rumuz}
                  onChange={handleInputChange}
                  inputRef={inputRef}
                />
              </Box>
              <Box sx={{ marginTop: "10px" }}>
                <label htmlFor="email">Email:</label>
                <EmailInput
                  value={formData.email}
                  onChange={handleInputChange}
                  inputRef={inputRef}
                />
              </Box>
              <Box sx={{ marginTop: "10px" }}>
                <label htmlFor="city">City:</label>
                <TextField
                  sx={{ width: "100%" }}
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ marginTop: "10px" }}>
                <label htmlFor="infoText">Info Text:</label>
                <TextField
                  sx={{ width: "100%" }}
                  multiline
                  id="infoText"
                  name="infoText"
                  value={formData.infoText}
                  onChange={handleInputChange}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: "10px" }}
                onClick={handleCreate}
              >
                Create
              </Button>
            </form>
          </Box>
        </Modal>
        <input
          type="text"
          id="searchInput"
          placeholder="Search..."
          style={{
            marginLeft: "38%",
            marginTop: "20px",
            width: "400px",
            height: "35px",
          }}
          onChange={handleSearch}
        />
        <Typography variant="h2">User List</Typography>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
              <th style={updatedStyles.columnHeader}>Rumuz</th>
              <th style={updatedStyles.columnHeader}>Email</th>
              <th style={updatedStyles.columnHeader}>City</th>
              <th style={updatedStyles.columnHeader}>Info Text</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={updatedStyles.cell}>{user.rumuz}</td>
                <td style={updatedStyles.cell}>{user.email}</td>
                <td style={updatedStyles.cell}>{user.city}</td>
                <td style={updatedStyles.cell}>{user.infoText}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </ThemeProvider>
  );
};

export default ListPage;
