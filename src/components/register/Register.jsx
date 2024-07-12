import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  createTheme,
  IconButton,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import cities from "../../cities.json";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { register, toggleDarkMode } from '../../actions';
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cityList, setCityList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidationError, setPasswordValidationError] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
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

  const handleRegister = () => {
    const user = { username, password, email };
    dispatch(register(user));
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
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(passwordToValidate);

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
      passwordError = 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>).';
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

  useEffect(() => {
    setCityList(cities);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordValidationError || confirmPasswordError || emailValidationError) {
      return;
    }

    const user = {
      email,
      city,
      password,
    };

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    existingUsers.push(user);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setEmail("");
    setCity("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordError(
      newConfirmPassword !== password ? "Passwords do not match." : ""
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: theme.palette.background.default,
            padding: 3,
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <Typography component="h1" variant="h5" color={theme.palette.text.primary}>
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
              error={emailValidationError !== ""}
              helperText={emailValidationError}
              onChange={(e) => setUsername(e.target.value)}
              InputLabelProps={{
                style: { color: theme.palette.text.primary },
              }}
              inputProps={{
                style: { color: theme.palette.text.primary },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              error={emailValidationError !== ""}
              helperText={emailValidationError}
              onChange={handleEmailChange}
              InputLabelProps={{
                style: { color: theme.palette.text.primary },
              }}
              inputProps={{
                style: { color: theme.palette.text.primary },
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="city-label" style={{ color: theme.palette.text.primary }}>City</InputLabel>
              <Select
                labelId="city-label"
                id="city"
                value={city}
                label="City"
                onChange={(e) => setCity(e.target.value)}
                required
                style={{ color: theme.palette.text.primary }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.primary,
                    },
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Please select a city
                </MenuItem>
                {cityList.map((city, index) => (
                  <MenuItem key={index} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              error={passwordValidationError !== ""}
              helperText={passwordValidationError}
              onChange={handlePasswordChange}
              InputProps={{
                style: { color: theme.palette.text.primary },
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
              InputLabelProps={{
                style: { color: theme.palette.text.primary },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              error={confirmPasswordError !== ""}
              helperText={confirmPasswordError}
              onChange={handleConfirmPasswordChange}
              InputProps={{
                style: { color: theme.palette.text.primary },
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
              InputLabelProps={{
                style: { color: theme.palette.text.primary },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
              disabled={
                passwordValidationError !== "" || confirmPasswordError !== ""
              }
            >
              Register
            </Button>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              Already have an account?{" "}
              <Link component={RouterLink} to="/"  style={{ color: theme.palette.text.primary }}>
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ position: "absolute", top: "20px" }}>
          <Button onClick={() => dispatch(toggleDarkMode())}>
            <SettingsBrightnessIcon sx={{ mr: 0.5 }} />{" "}
            {darkMode ? "Dark Mode" : "Light Mode"}
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
