import axios from "axios";
import { useEffect,useState } from "react";

export const useFetchCourse=(apiURL,courseId)=>{
const [courseData, setCourseData] = useState(null);

useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${apiURL}/${courseId}`);
        setCourseData(response.data);
      } catch (error) {
        console.log(`Fetching from URL: ${apiURL}/${courseId}`);
        console.log(error);
      }
    };
    fetchCourseDetails();
  }, [courseId,apiURL]);
return courseData;
}