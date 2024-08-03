import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Modal,
  createTheme,
  ThemeProvider,
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
  IconButton,
} from "@mui/material";
import MenuHeader from "../menu/MenuHeader";
import { styles } from "./ListStyle";
import EmailInput from "../EmailInput";
import { useDispatch, useSelector } from "react-redux";
import { create, addUser } from "../../actions";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { toggleDarkMode } from "../../actions.js";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ListPage = () => {
  const [userList, setUserList] = useState(() => {
    return JSON.parse(localStorage.getItem("userList")) || [];
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [comment, setComment] = useState("");
  const usersPerPage = 10;
  const inputRef = useRef();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.user?.email);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#fff",
        paper: darkMode ? "#333" : "#fff",
      },
      text: {
        primary: darkMode ? "#fff" : "#000",
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
      cursor: "pointer",
    },
  };

  const [formData, setFormData] = useState({
    username: "",
    email: userEmail || "",
    city: "",
    infoText: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);

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
    setFormData({ username: "", email: userEmail || "", city: "", infoText: "" });
    setOpenModal(false);
    setFilteredUsers(newUserList);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredUsers = userList.filter(
      (user) =>
        user.username.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.city.toLowerCase().includes(searchText) ||
        user.infoText.toLowerCase().includes(searchText)
    );
    setFilteredUsers(filteredUsers);
  };

  useEffect(() => {
    setFilteredUsers(userList);
  }, [userList]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setComment(user.comment || "");
    setOpenCommentModal(true);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (selectedUser) {
      const updatedUserList = userList.map((user) =>
        user.email === selectedUser.email
          ? { ...user, comment: comment }
          : user
      );
      setUserList(updatedUserList);
      setComment("");
      setSelectedUser(null);
      setOpenCommentModal(false);
    }
  };

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const CollapsibleRow = ({ user }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow
          onClick={() => handleUserClick(user)}
          sx={{ cursor: "pointer" }}
        >
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{user.username}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.city}</TableCell>
          <TableCell>{user.infoText}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Comments
                </Typography>
                {user.comment ? (
                  <Typography>{user.comment}</Typography>
                ) : (
                  <Typography>No comments</Typography>
                )}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: "absolute", top: "80px", left: "9px" }}>
        <Button onClick={() => dispatch(toggleDarkMode())}>
          <SettingsBrightnessIcon sx={{ mr: 0.5 }} />{" "}
          {darkMode ? "Dark Mode" : "Light Mode"}
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: darkMode ? "background.default" : "background.paper",
          color: darkMode ? "text.primary" : "text.primary",
          padding: 1,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
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
                <label htmlFor="username">Username:</label>
                <TextField
                  sx={{ width: "100%" }}
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
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
            borderRadius: "8px",
            padding: "5px 10px",
            border: "1px solid #ccc",
          }}
          onChange={handleSearch}
        />

        <Typography variant="h4" style={{ marginBottom: "10px" }}>
          User List
        </Typography>
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
            <TableBody>
              {currentUsers.map((user, index) => (
                <CollapsibleRow key={index} user={user} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(filteredUsers.length / usersPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        />
      </Box>

      <Modal
        open={openCommentModal}
        onClose={() => setOpenCommentModal(false)}
        aria-labelledby="comment-modal-title"
        aria-describedby="comment-modal-description"
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
          <Typography variant="h4" id="comment-modal-title" gutterBottom>
            Add Comment for {selectedUser?.username}
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChange}
          />
          <Button
            variant="contained"
            sx={{ marginTop: "10px" }}
            onClick={handleCommentSubmit}
          >
            Submit Comment
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ListPage;
