import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidationError, setPasswordValidationError] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      navigate("/homePage/HomePage");
    } else {
      alert("Invalid email or password.");
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (passwordToValidate) => {
    const hasMinimumLength = passwordToValidate.length >= 8;
    const hasUppercase = /[A-Z]/.test(passwordToValidate);
    const hasLowercase = /[a-z]/.test(passwordToValidate);
    const hasNumber = /\d/.test(passwordToValidate);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(
      passwordToValidate
    );

    let passwordError = "";

    if (!hasMinimumLength) {
      passwordError = "Password must be at least 8 characters.";
    } else if (!hasUppercase) {
      passwordError = "Password must contain at least one uppercase letter.";
    } else if (!hasLowercase) {
      passwordError = "Password must contain at least one lowercase letter.";
    } else if (!hasNumber) {
      passwordError = "Password must contain at least one number.";
    } else if (!hasSpecialCharacter) {
      passwordError =
        'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>).';
    }

    setPasswordValidationError(passwordError);
  };

  const validateEmail = (emailToValidate) => {
    const isValidEmail = /\S+@\S+\.\S+/.test(emailToValidate);

    setEmailValidationError(isValidEmail ? "" : "Invalid email address");
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundColor: "#f5f5f5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/image/dev.gif"
            alt="Colorful abstract painting"
            style={{
              width: "50%",
              height: "50%",
              objectFit: "cover",
              borderRadius: "100px",
              maxHeight: "100vh",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                error={emailValidationError !== ""}
                helperText={emailValidationError}
                onChange={handleEmailChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                error={passwordValidationError !== ""}
                helperText={passwordValidationError}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={
                  passwordValidationError !== "" || emailValidationError !== ""
                }
              >
                Sign In
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" color="gray">
                Don't have an account yet?
              </Typography>

              <Box sx={{ ml: 2 }}>
                <Link
                  component={RouterLink}
                  to="/register/Register"
                  underline="none"
                >
                  Register
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Box sx={{ position: "absolute", top: "20px" }}>
          <Button onClick={toggleDarkMode}>
            <SettingsBrightnessIcon sx={{ mr: 0.5 }} />{" "}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginForm;
