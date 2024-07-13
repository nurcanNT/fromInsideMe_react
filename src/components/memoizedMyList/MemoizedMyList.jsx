import { Button, ThemeProvider, CssBaseline, createTheme, Box } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { styles } from "./MemoizedMyStyles";
import { useSelector, useDispatch } from 'react-redux';
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { toggleDarkMode } from "../../actions";

const MemoizedMyList = memo(({ exampleData }) => {

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

  const [myList, setMyList] = useState(() => {
    const storedList = JSON.parse(localStorage.getItem("myList"));
    return storedList ? storedList : exampleData;
  });

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  const handleDelete = (index) => {
    const newUserList = [...myList];
    newUserList.splice(index, 1);
    setMyList(newUserList);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: "absolute", top: "50px" }}>
          <Button onClick={() => dispatch(toggleDarkMode())}>
            <SettingsBrightnessIcon sx={{ mr: 0.5 }} />{" "}
            {darkMode ? "Dark Mode" : "Light Mode"}
          </Button>
        </Box>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
          <th style={styles.columnHeader}>Rumuz</th>
          <th style={styles.columnHeader}>Email</th>
          <th style={styles.columnHeader}>City</th>
          <th style={styles.columnHeader}>Info Text</th>
          <th style={styles.columnHeader}>Action</th>
        </tr>
      </thead>
      <tbody>
        {myList.map((user, index) => (
          <tr key={index} style={{ borderBottom: "1px solid #f0f0f0" }}>
            <td style={styles.cell}>{user.rumuz}</td>
            <td style={styles.cell}>{user.email}</td>
            <td style={styles.cell}>{user.city}</td>
            <td style={styles.cell}>{user.infoText}</td>
            <td style={styles.cell}>
              <Button variant="contained" onClick={() => handleDelete(index)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </ThemeProvider>
  );
});

export default MemoizedMyList;
