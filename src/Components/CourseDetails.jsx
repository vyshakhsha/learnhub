import React from "react";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import NavBar from "./NavBar";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';
import Button from "@mui/material/Button";
import { useSelector,useDispatch } from "react-redux";
import { addToCartItem } from "../Redux/cartSlice";
import "../Assets/Styles/CourseDetails.scss";
import { useFetchCourse } from "../Hooks/useFetchCourse";

export default function CourseDetails() {
  const courseId = useSelector((state) => state.course.selectedCourse);
  const userId = useSelector((state) => state.user.userData.userId);
  const apiURL = process.env.REACT_APP_SPECIFIC_COURSE_URL;

  const desc =
    "Gain essential knowledge and skills with our engaging course, designed for learners at all levels. Through interactive lessons and real-world applications, you'll be able to apply what you learn right away. Join a supportive community and start reaching your goals with guidance from expert instructors!";
  const rating= Math.floor(Math.random() * 3) + 3;
  const dispatch=useDispatch()
  const courseData=useFetchCourse(apiURL,courseId)
  if (courseData) {
    return (
      <Box sx={{ width: "100%" }}>
        <NavBar />
        <Paper className="course-container">
          <div className="course-image">
            <img src={courseData.image} alt="course" />
          </div>
          <div className="course-details">
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "1.6rem",
                fontWeight: "600",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              {courseData.name}
            </Typography>           
            <Rating name="read-only" value={rating} readOnly />
            <p className="desc">{desc}</p>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "1.4rem",
                fontWeight: "600",
                marginTop: "10px",
              }}
            >
              {courseData.author}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "1.8rem",
                fontWeight: "600",
                marginTop: "10px",
              }}
            >
              ₹{courseData.price}
            </Typography>
            <Button
                    size="large"
                    sx={{marginTop:"15px"}}
                    onClick={() => {
                      dispatch(
                        addToCartItem({
                          courseId: courseId,
                          userId: userId,
                          status: "added",
                          price: courseData.price,
                        })
                      );
                    }}
                  >
                    Add to Cart
                  </Button>
          </div>
        </Paper>
      </Box>
    );
  } else {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }
}
