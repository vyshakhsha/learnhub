import React, { useEffect } from "react";
import { auth, db } from "../Components/Firebase";
import { getDoc, doc } from "firebase/firestore";
import { Paper } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../Redux/userSlice";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import NavBar from "../Components/NavBar";
import CourseCards from "../Components/CourseCards";
import WelcomeMsg from "../Components/WelcomeMsg";
import banner from "../Assets/Images/banner.png"
import "../Assets/Styles/Home.scss";
import AddNewCourse from "../Components/AddNewCourse";
import CourseCategory from "../Components/CourseCategory";

export default function Home() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(setUserData({...docSnap.data(),userId:user.uid}));
        } else {
          console.log("Not found the user");
        }
      });
    };
    fetchUserData();
  }, [dispatch]);
  return (
    <div className="home">
      {userData ? (
        <>
          <NavBar />
          <div className="dashboard">
            <div className="content">
            <WelcomeMsg />
              <Paper className="banner" sx={{backgroundColor:"#465B79"}}>
                <img src={banner} alt="banner"/>
              </Paper>
              
              {userData.userType === "Teacher" ? <AddNewCourse /> : null}
              {userData.userType === "Student" ?<CourseCards type="all-courses"/>:null}
              {userData.userType === "Student" ?<CourseCategory type="all-courses"/>:null}             
            </div>
          </div>
        </>
      ) : (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </div>
  );
}
