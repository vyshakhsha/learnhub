import React, { useState } from "react";
import CourseCards from "./CourseCards.jsx"
import {CategoryList} from "../Assets/Data/Data.js"
import "../Assets/Styles/Home.scss";

function CourseCategory() {

  const [category,setCategory]=useState("")

  return (<>
    <div className="CourseCategory">
      {CategoryList.map((listItem,index) => {
        const imagePath = require(`../Assets/Images/Category/${listItem}.jpg`);
        return (
          <div className="category-card" onClick={()=>setCategory(listItem)} key={index}>
            <img src={imagePath} alt="course" />
            <div className="category-text">
            <h3>{listItem}</h3>
            </div>
          </div>
        );
      })}
    </div>
    {category&&<CourseCards type="category-wise" category={category}/>}
    </>
  );
}

export default CourseCategory;
