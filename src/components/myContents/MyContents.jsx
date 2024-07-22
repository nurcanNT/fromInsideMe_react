import React, { useEffect, useState } from "react";
import MenuHeader from "../menu/MenuHeader";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import MemoizedMyList from "../memoizedMyList/MemoizedMyList";
import { useSelector } from "react-redux";

const MyContents = () => {
  const userEmail = useSelector(state => state.auth.user?.email);
  const darkMode = useSelector(state => state.theme.darkMode);

  const [myList, setMyList] = useState(() => {
    return JSON.parse(localStorage.getItem("myList")) || [];
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: userEmail || "",
      city: "",
      infoText: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      infoText: Yup.string().required("Info Text is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const newList = [...myList, values];
      setMyList(newList);
      localStorage.setItem("myList", JSON.stringify(newList));
      resetForm();
    },
  });

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  const styles = {
    formContainer: {
      backgroundColor: darkMode ? "#333" : "#fff",
      padding: "20px",
      width: "400px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      margin: "50px",
      marginLeft: "500px", 
    },
    formStyles: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    inputStyles: {
      marginBottom: "10px",
    },
    buttonStyles: {
      marginTop: "10px",
      color: darkMode ? "#000" : "#fff",
    },
    listContainer: {
      margin: "20px",
    },
    listTitle: {
      marginBottom: "10px",
      color: darkMode ? "#fff" : "#000",
    },
    textFieldRoot: {
      "& .MuiInputBase-root": {
        color: darkMode ? "#fff" : "#000", 
      },
      "& .MuiInputLabel-root": {
        color: darkMode ? "#fff" : "#000", 
      },
      "& .MuiFormHelperText-root": {
        color: darkMode ? "#fff" : "#000", 
      },
    },
  };

  return (
    <Box sx={{padding: 1}}>
      <MenuHeader />
      <Box sx={styles.formContainer}>
        <form onSubmit={formik.handleSubmit} style={styles.formStyles}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            style={styles.inputStyles}
            sx={styles.textFieldRoot}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            style={styles.inputStyles}
            sx={styles.textFieldRoot}
          />
          <TextField
            fullWidth
            id="city"
            name="city"
            label="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            style={styles.inputStyles}
            sx={styles.textFieldRoot}
          />
          <TextField
            fullWidth
            id="infoText"
            name="infoText"
            label="Info Text"
            value={formik.values.infoText}
            onChange={formik.handleChange}
            error={formik.touched.infoText && Boolean(formik.errors.infoText)}
            helperText={formik.touched.infoText && formik.errors.infoText}
            style={styles.inputStyles}
            sx={styles.textFieldRoot}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={styles.buttonStyles}
          >
            Submit
          </Button>
        </form>
      </Box>
      <Box sx={styles.listContainer}>
        <Typography variant="h5" sx={styles.listTitle}>
          MyContents
        </Typography>
        <MemoizedMyList exampleData={myList} />
      </Box>
    </Box>
  );
};

export default MyContents;
