import React, {useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { toast, ToastContainer } from "react-toastify";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "../Assets/Styles/AddNewCourse.scss";

function AddNewCourse() {
  const categories = [
    "Technology",
    "Finance",
    "Language",
    "Science",
    "Maths",
    "Arts",
    "Programming",
    "Psychology",
  ];
  const author = useSelector((state) => state.user.userData.userName);
  const authorEmail = useSelector((state) => state.user.userData.email);
  const [courseData, setCourseData] = useState({
    id: "",
    name: "",
    author: author,
    Email: authorEmail,
    image: "",
    price: 0,
    category: "",
    rating: 0,
    students: 0,
  });
  const [buttonState, setButtonState] = useState(false);
  const unsplashEndPoint = process.env.REACT_APP_RANDOM_COURSE_IMAGE;
  const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_KEY;
  const addNewCourseURL = process.env.REACT_APP_ADD_NEW_COURSE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (buttonState) return;
    setButtonState(true);
    if (!courseData.name) {
      toast.error("Name is required", { position: "top-center" });
      setButtonState(false);
      return;
    }
    if (!courseData.price) {
      toast.error("Price is required", { position: "top-center" });
      setButtonState(false);
      return;
    }
    if (!courseData.category) {
      toast.error("Category is required", { position: "top-center" });
      setButtonState(false);
      return;
    }
    try {
      const apiURL = `${unsplashEndPoint}?client_id=${unsplashAccessKey}&count=1&orientation=landscape&query=${courseData.category}`;
      const response = await axios.get(apiURL);
      const imageUrl = response.data[0]?.urls.raw;
      if (imageUrl) {
        const updatedCourseData = {
          ...courseData,
          id: uuidv4(),
          image: imageUrl,
        };
        try {
          const response = await axios.post(addNewCourseURL, updatedCourseData);
          if (response.data === "Success") {
            toast.success("Course Added successfully !", {
              position: "top-center",
            });
            setCourseData({
              id: "",
              name: "",
              author: author,
              Email: authorEmail,
              image: "",
              price: "",
              category: "",
              rating: 0,
              students: 0,
            });
          }
        } catch (error) {
          console.log(courseData);
          toast.error("Error occured while adding course", {
            position: "top-center",
          });
        }
      }
    } catch (error) {
      setButtonState(false);
      console.log(error);
      toast.error("Error occured while fetchng image ", {
        position: "top-center",
      });
      return;
    } finally {
      setButtonState(false);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="newCourse-form">
        <h2>Add New Course</h2>
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, width: "23ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-Text">Name</InputLabel>
            <OutlinedInput
              className="form-elements"
              id="Name"
              label="Name"
              name="name"
              value={courseData.name}
              onChange={(e) => {
                setCourseData({ ...courseData, name: e.target.value });
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "23ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-Text">Price</InputLabel>
            <OutlinedInput
              className="form-elements"
              id="Price"
              label="Price"
              name="price"
              value={courseData.price}
              onChange={(e) => {
                setCourseData({ ...courseData, price: Number(e.target.value) });
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "23ch" }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="Category"
              value={courseData.category}
              label="Category"
              name="category"
              onChange={(e) => {
                setCourseData({ ...courseData, category: e.target.value });
              }}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            disabled={buttonState}
            sx={{
              width: "230px",
              marginTop: "8px",
              "&:disabled": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            Add Course
          </Button>
        </form>
      </div>
    </>
  );
}

export default AddNewCourse;
