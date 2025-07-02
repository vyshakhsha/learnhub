import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import axios from "axios";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addToCartItem } from "../Redux/cartSlice";
import { setSelectedCourse } from "../Redux/courseSlice";

function CourseCards(props) {
  const [courseData, setCourseData] = useState([]);
  const navigate = useNavigate();
  const apiUrlAllCourses = process.env.REACT_APP_GET_ALL_COURSES_URL;
  const apiUrlCategoryWiseCourses =
    process.env.REACT_APP_CATEGORY_WISE_COURSE_URL;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userData.userId);
  useEffect(() => {
    const fetchCourseData = async () => {
      if (props.type === "all-courses") {
        const response = await axios.get(apiUrlAllCourses,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data) {
          setCourseData(response.data);
          setLoading(false);
        }
      }
      if (props.type === "category-wise") {
        const response = await axios.get(apiUrlCategoryWiseCourses, {
          headers: {
            category: props.category,
          },
        });
        if (response.data) {
          setCourseData(response.data);
          setLoading(false);
        }
      }
    };
    fetchCourseData();
  }, [props.type, props.category, apiUrlAllCourses, apiUrlCategoryWiseCourses]);

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <ArrowCircleLeftRoundedIcon
        className={className}
        onClick={onClick}
        sx={{
          fontSize: "2.5rem",
          color: "#42536B", // Change this to your desired color
          position: "absolute",
          left: "10px", // Adjust position as needed
          zIndex: 1,
          transition: "color 0.3s ease", // Smooth transition for color change
          "&:hover": {
            color: "#42536B",
            fontSize: "3rem",
          },
        }}
      />
    );
  };
  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <ArrowCircleRightRoundedIcon
        className={className}
        onClick={onClick}
        sx={{
          fontSize: "2.5rem",
          position: "absolute",
          color: "#42536B",
          right: "10px", // Adjust position as needed
          zIndex: 1, // Ensure it’s above other elements
          transition: "color 0.3s ease", // Smooth transition for color change
          "&:hover": {
            color: "#42536B",
            fontSize: "3rem",
          },
        }}
      />
    );
  };

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of cards visible at once
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
   responsive: [
  {
    breakpoint: 1440, // Large desktop screens
    settings: { slidesToShow: 4 },
  },
  {
    breakpoint: 1200, // Desktop screens
    settings: { slidesToShow: 3 },
  },
  {
    breakpoint: 992, // Medium laptops
    settings: { slidesToShow: 2 },
  },
  {
    breakpoint: 768, // Tablets
    settings: { slidesToShow: 2 },
  },
  {
    breakpoint: 576, // Small mobile devices
    settings: { slidesToShow: 1 },
  },
  {
    breakpoint: 380, // Extra small mobile devices
    settings: { slidesToShow: 1 },
  },
],

  };
  if (loading)
    return (
      <div className="CourseCards">
        {props.type === "all-courses" ? (
          <h2>Trending Courses</h2>
        ) : (
          <h2>Popular Courses in {props.category}</h2>
        )}
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      </div>
    );
  else
    return (
      <div className="CourseCards">
        {props.type === "all-courses" ? (
          <h2>Trending Courses</h2>
        ) : (
          <h2>Popular Courses in {props.category}</h2>
        )}
        <div className="slider-container">
          <Slider {...settings} className="Courses">
            {courseData.map((course) => (
              <Card className="Card" key={course.id}>
                <CardMedia
                  className="cardMedia"
                  component="img"
                  alt="Course-image"
                  image={course.image + "&w=800&h=600&fit=crop"}
                  loading="lazy"
                />
                <CardContent className="cardContent" sx={{ height: "35%" }}>
                  <Typography
                    className="coursename"
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      display: "-webkit-box",
                      whiteSpace: "normal",
                      WebkitLineClamp: 2, // Limits the text to 2 lines
                      WebkitBoxOrient: "vertical", // Ensures text is laid out vertically
                      overflow: "hidden", // Hides overflowed content
                      textOverflow: "ellipsis",
                    }}
                  >
                    {course.courseName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.primary", fontSize: "1rem" }}
                  >
                    {course.author}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      marginTop: "10px",
                    }}
                  >
                    ₹{course.price}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ textAlign: "center", justifyContent: "center" }}
                >
                  <Button
                    size="small"
                    onClick={() => {
                      dispatch(
                        addToCartItem({
                          courseId: course.id,
                          userId: userId,
                          status: "added",
                          price: course.price,
                        })
                      );
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      dispatch(setSelectedCourse(course.id));
                      navigate("/courseDetails");
                    }}
      
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Slider>
        </div>
      </div>
    );
}
export default CourseCards;
