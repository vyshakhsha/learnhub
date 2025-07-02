import { Paper } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import NavBar from "../Components/Navbar";
import CourseCards from "../Components/CourseCards";
import WelcomeMsg from "../Components/WelcomeMsg";
import banner from "../Assets/Images/banner.png"
import "../Assets/Styles/Home.scss";
import AddNewCourse from "../Components/AddNewCourse";
import CourseCategory from "../Components/CourseCategory";

export default function Home() {
  const userData = useSelector((state) => state.user.userData);
 
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
