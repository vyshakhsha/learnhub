import "./Assets/Styles/App.scss";
import Landing from "./Pages/Landing";
import theme from "./Components/Theme";
import { ThemeProvider } from "@mui/material/styles";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import { useEffect, useState } from "react";
import { auth } from "./Components/Firebase";
import CourseDetails from "./Components/CourseDetails";
import CartDetails from "./Components/CartDetails";
import Checkout from "./Components/Checkout";
import MyCourses from "./Components/MyCourses";
import Learn from "./Components/Learn";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
export default App;
