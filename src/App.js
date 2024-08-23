import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomePage from './components/homePage/HomePage';
import MyContents from './components/myContents/MyContents';
import ListPage from './components/list/ListPage';
import "./App.css";
import MyAccount from './components/myAccount/MyAccount'
import LoginForm from "./components/login/LoginForm";
import Register from "./components/register/Register";
import Profile from './components/profileMenu/Profile'; 
import FavoriteComments from './components/favoriteComments/FavoriteComments';
import { useSelector } from 'react-redux';

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
  },
});

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register/Register" element={<Register />} />
            <Route path="/homePage/HomePage" element={<HomePage />} />
            <Route path="/myContents/MyContents" element={<MyContents />} />
            <Route path="/list/ListPage" element={<ListPage />} />
            <Route path="/profile/Profile" element={<Profile />} />
            <Route path="/myAccount/MyAccount" element={<MyAccount/>} />
            <Route path="/favoriteComments/FavoriteComments" element={<FavoriteComments/>} />
          </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
