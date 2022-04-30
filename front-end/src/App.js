import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Home from './pages/Home'
import Docs from './pages/Docs'
import Contact from './pages/Contact'
import Applications from './pages/Applications';
import Footer from './components/Footer'
import NavAppBar from './components/nav/NavAppBar'
import CreateApplication from './pages/CreateApplication';
import Login from './components/auth/Login'
import ResetPassword from './components/auth/ResetPassword';
import Register from './components/auth/Register'
import PrivateRoute from './authentication/PrivateRoute'
import { AuthProvider } from './authentication/AuthProvider';

export default function App() {

  const theme = createTheme({
    typography: {
      button: {
        textTransform: "none",
        fontSize: 16
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AuthProvider>
          <NavAppBar />
          <Routes>
            <Route exact path="/" element={< Home />} />
            <Route exact path="/docs" element={< Docs />} />
            <Route exact path="/contact" element={< Contact />} />
            <Route exact path="/applications" element={
              <PrivateRoute>
                <Applications />
              </PrivateRoute>
            } />
            <Route exact path="/applications/create" element={
              <PrivateRoute>
                <CreateApplication />
              </PrivateRoute>
            } />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/reset" element={<ResetPassword />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
        <Footer />
      </div>
    </ThemeProvider >
  );
}