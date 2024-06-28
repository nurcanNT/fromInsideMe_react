import React, { useState, useEffect, useMemo, useRef } from "react";
import { Button, TextField, Typography, Box, Modal } from "@mui/material";
import MenuHeader from "../menu/MenuHeader";
import { styles } from "./ListStyle";
import EmailInput from "../EmailInput";

const ListPage = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const inputRef = useRef();

  const [formData, setFormData] = useState({
    rumuz: "",
    email: "",
    city: "",
    infoText: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const userList = useMemo(
    () => JSON.parse(localStorage.getItem("userList")) || [],
    []
  );

  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(userList));
  }, [userList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserList = [...userList, formData];
    localStorage.setItem("userList", JSON.stringify(newUserList));
    setFormData({ rumuz: "", email: "", city: "", infoText: "" });
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

  return (
    <Box>
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
              <EmailInput //forwardRef
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
            <th style={styles.columnHeader}>Rumuz</th>
            <th style={styles.columnHeader}>Email</th>
            <th style={styles.columnHeader}>City</th>
            <th style={styles.columnHeader}>Info Text</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <td style={styles.cell}>{user.rumuz}</td>
              <td style={styles.cell}>{user.email}</td>
              <td style={styles.cell}>{user.city}</td>
              <td style={styles.cell}>{user.infoText}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default ListPage;
