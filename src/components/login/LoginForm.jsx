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
import { useDispatch, useSelector } from 'react-redux';
import { login, toggleDarkMode } from '../../actions'

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameValidationError, setUsernameValidationError] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      text: {
        primary: darkMode ? "#fff" : "#000",
      },
    },
  });

  const handleLogin = () => {
    const user = { username, password, email };
    dispatch(login(user));
  };

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
            src="image/gif.gif"
            alt="Colorful abstract painting"
            style={{
              width: "45%",
              height: "60%",
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
            <Box sx={{ position: "absolute", top: "20px" }}>
          <Button onClick={() => dispatch(toggleDarkMode())}>
            <SettingsBrightnessIcon sx={{ mr: 0.5 }} />{" "}
            {darkMode ? "Dark Mode" : "Light Mode"}
          </Button>
        </Box>
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
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                error={usernameValidationError !== ""}
                helperText={usernameValidationError}
                onChange={(e) => setUsername(e.target.value)}
              />
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
                onClick={handleLogin}
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

              <Box sx={{ ml: 2}}>
                <Link
                  component={RouterLink}
                  to="/register/Register"
                  underline="none"
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                >
                  Register
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginForm;
