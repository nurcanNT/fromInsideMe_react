import React, { useEffect, useMemo } from "react";
import MenuHeader from "../menu/MenuHeader";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "./MyContentsStyle";
import MemoizedMyList from "../memoizedMyList/MemoizedMyList";
import { exampleData } from "../../exampleData";

const MyContents = () => {
  const formik = useFormik({
    initialValues: {
      rumuz: "",
      infoText: "",
      email: "",
    },
    validationSchema: Yup.object({
      rumuz: Yup.string().required("Rumuz is required"),
      infoText: Yup.string().required("Info Text is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const myList = useMemo(
    () => JSON.parse(localStorage.getItem("myList")) || [],
    []
  );

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  return (
    <Box>
      <MenuHeader />
      <Box sx={styles.formContainer}>
        <form onSubmit={formik.handleSubmit} style={styles.formStyles}>
          <TextField
            fullWidth
            id="rumuz"
            name="rumuz"
            label="Rumuz"
            value={formik.values.rumuz}
            onChange={formik.handleChange}
            error={formik.touched.rumuz && Boolean(formik.errors.rumuz)}
            helperText={formik.touched.rumuz && formik.errors.rumuz}
            style={styles.inputStyles}
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
        <MemoizedMyList exampleData={exampleData} />
      </Box>
    </Box>
  );
};

export default MyContents;
