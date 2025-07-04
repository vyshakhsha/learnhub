import React from "react";
import { useEffect } from "react";
import NavBar from "./Navbar";
import { Typography, Paper, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyCourses, fetchAllCourses } from "../Redux/courseSlice";
import { fetchBoughtItems } from "../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { setSelectedCourse } from "../Redux/courseSlice";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import "../Assets/Styles/CourseDetails.scss";

export default function MyCourses() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userData.userId);
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const title =
    user.userType === "Teacher" ? "Courses Created" : "Courses Enrolled";
  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(fetchMyCourses(userId));
    dispatch(fetchBoughtItems(userId));
  }, [dispatch, userId]);
  const allCourseData = useSelector((state) => state.course.allCourses);
  //const MyCourseData = useSelector((state) => state.course.MyCourses);
  const boughtItems = useSelector((state) => state.cart.boughtItems);
  let allCourseDataWithStatus = [];
  if (user.userType === "Teacher") {
    allCourseDataWithStatus = allCourseData.map((allItem) => {
      return {
        ...allItem,
        isMyCourse: allItem.author === user.userName ? true : false,
      };
    });
  } else {
    allCourseDataWithStatus = allCourseData.map((allItem) => {
      const isMyCourse = boughtItems.some(
        (myItem) => myItem.courseId === allItem.id
      );
      return {
        ...allItem,
        isMyCourse: isMyCourse ? true : false,
      };
    });
  }
  return (
    <>
      <NavBar />
      <h2 style={{ marginBottom: 0, paddingBottom: 0 }}>{title}</h2>
      {allCourseDataWithStatus.length === 0 ? (
        (<Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>)
      ) : (
        <Box className="myCourseContainer">
          <div className="cart-container">
            {allCourseDataWithStatus.map(
              (course, index) =>
                course.isMyCourse && (
                  <Paper className="cart-item" key={index}>
                    <div className="course-image">
                      <img
                        src={course.image + "&w=800&h=600&fit=crop"}
                        alt="course"
                      />
                    </div>
                    <Typography
                      className="course-name"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {course.courseName}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => {
                        dispatch(setSelectedCourse(course));
                        navigate("/Learn");
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      {user.userType === "Teacher"
                        ? "Go to Details"
                        : "Continue Learning"}
                    </Button>
                  </Paper>
                )
            )}
          </div>
        </Box>
      )}
    </>
  );
}
