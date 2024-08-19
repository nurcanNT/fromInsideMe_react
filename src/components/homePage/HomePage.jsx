import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuHeader from "../menu/MenuHeader";
import { styles } from "./HomePageStyle";
import { Box, Typography, createTheme, ThemeProvider, Button, CssBaseline } from "@mui/material";
import "./HomePageStyle.js";
import { faSun, faCloudRain, faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { toggleDarkMode } from "../../actions.js";
import { useSelector, useDispatch } from 'react-redux';

const HomePage = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: "",
    condition: "",
    cityName: "",
    month: "",
    day: "",
  });
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

  const getIcon = (condition) => {
    switch (condition) {
      case "Sunny":
        return <FontAwesomeIcon icon={faSun} size="5x" />;
      case "Rainy":
        return <FontAwesomeIcon icon={faCloudRain} size="5x" />;
      case "Cloudy":
        return <FontAwesomeIcon icon={faCloud} size="5x" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const selectedCity = "Istanbul";

    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(
      selectedCity
    )}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ff7ad70af4mshdffbf34dc23f9c1p108b22jsn257bba9cd7ad",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.get(url, options);
      const data = response.data;
      const temperature = data.current.temp_c;
      const condition = data.current.condition.text;
      const cityName = data.location.name;
      const month = new Date().toLocaleString("default", { month: "long" });
      const day = new Date().getDate();

      setWeatherData({
        temperature: temperature + "°C",
        condition,
        cityName,
        month,
        day,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  const {
    havaDurumu,
    havaIcon,
    havaBilgi,
    havaDerece,
    havaDurum,
    havaSehir,
    havaAy,
    havaGun,
    havaTarih,
  } = styles;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Box sx={{padding: 1}}>
      <Box sx={{ position: "absolute", top: "80px", left: "65px" }}>
          <Button onClick={() => dispatch(toggleDarkMode())}>
            <SettingsBrightnessIcon sx={{ mr: 0.5 }} />{" "}
            {darkMode ? "Dark Mode" : "Light Mode"}
          </Button>
        </Box>
      <MenuHeader />
      <Box sx={havaDurumu}>
        <Box sx={havaBilgi}>
          <Typography sx={havaDerece}>{weatherData.temperature}</Typography>
          <Typography sx={havaDurum}>{weatherData.condition}</Typography>
          <Typography sx={havaSehir}>{weatherData.cityName}</Typography>
        </Box>
        <Box sx={havaTarih}>
          <Typography sx={havaAy}>{weatherData.month}</Typography>
          <Typography sx={havaGun}>{weatherData.day}</Typography>
        </Box>
      </Box>
    </Box>
    </ThemeProvider>
  );
};

export default HomePage;
