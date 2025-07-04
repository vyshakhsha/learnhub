import React from "react";
import NavBar from "./Navbar";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import "../Assets/Styles/Learn.scss";
import ReactPlayer from "react-player";
import Rating from "@mui/material/Rating";

export default function Learn() {
  const course = useSelector((state) => state.course.selectedCourse);
  const [value, setValue] = React.useState(3);

  return (
    <>
      <NavBar />
      <Paper className="course-container" style={{paddingTop:"2%"}}>
        <ReactPlayer width="100%"  url={"https://www.youtube.com/watch?v=jfKfPfyJRdk"} />
        <h3 style={{marginBottom:"0",paddingBottom:"0"}}>Part 1 : Introducton to {course.courseName}</h3>
        <div style={{ display: "flex",alignItems:"center",margin:"0",padding:"0"}}>
          <p style={{paddingRight:"10px"}}>Rate the tutorial</p>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </div>
      </Paper>
    </>
  );
}
