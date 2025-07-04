import "./Assets/Styles/App.scss";
import Landing from "./Pages/Landing";
import theme from "./Components/Theme";
import { ThemeProvider } from "@mui/material/styles";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import axios from "axios";
import CourseDetails from "./Components/CourseDetails";
import CartDetails from "./Components/CartDetails";
import Checkout from "./Components/Checkout";
import MyCourses from "./Components/MyCourses";
import Learn from "./Components/Learn";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { persistor } from "./Redux/Store";
import { useDispatch } from "react-redux";
import { setUserData } from "./Redux/userSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");
    const logoutURL = process.env.REACT_APP_LOGOUT_USER;

    await axios.post(
      logoutURL,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Logout successful");
  } catch (error) {
    console.log("Logout failed or already invalidated", error);
  } finally {
    // Clear storage and user state
    localStorage.clear();
    persistor.purge();
    navigate("/Login");
    // Set user as null — depends on your setup
    dispatch(setUserData(null)); // or useContext(AuthContext).setUser(null)
  }
};

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiry = payload.exp * 1000;
      const now = Date.now();

      if (now >= expiry) {
        console.log("Token has expired, logging out");
        handleLogout();
      } else {
        const timeout = expiry - now;
        const timer = setTimeout(() => {
          handleLogout();
        }, timeout);

        return () => clearTimeout(timer);
      }
    } catch (err) {
      console.error("Invalid token format", err);
      handleLogout();
    }
  }
}, );


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Navigate to="/Home" /> : <Landing />}
          />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/CourseDetails" element={<CourseDetails />} />
          <Route exact path="/CartDetails" element={<CartDetails />} />
          <Route exact path="/Checkout" element={<Checkout />} />
          <Route exact path="/MyCourses" element={<MyCourses />} />
          <Route exact path="/Learn" element={<Learn />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
export default App;
