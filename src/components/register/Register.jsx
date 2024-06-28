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
  IconButton,
} from "@mui/material";
import cities from "../../cities.json";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cityList, setCityList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidationError, setPasswordValidationError] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

  useEffect(() => {
    setCityList(cities);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      passwordValidationError ||
      confirmPasswordError ||
      emailValidationError
    ) {
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
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
          <FormControl fullWidth margin="normal">
            <InputLabel id="city-label">City</InputLabel>
            <Select
              labelId="city-label"
              id="city"
              value={city}
              label="City"
              onChange={(e) => setCity(e.target.value)}
              required
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
            autoComplete="new-password"
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            error={confirmPasswordError !== ""}
            helperText={confirmPasswordError}
            onChange={handleConfirmPasswordChange}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={
              passwordValidationError !== "" || confirmPasswordError !== ""
            }
          >
            Register
          </Button>
          <Typography variant="body2" color="textSecondary">
            Already have an account?{" "}
            <Link component={RouterLink} to="/" underline="hover">
              Log in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
