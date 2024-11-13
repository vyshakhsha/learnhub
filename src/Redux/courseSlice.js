import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    selectedCourse:null,
    allCourses:[],
    MyCourses:[]
}
const apiUrlAllCourses = process.env.REACT_APP_GET_ALL_COURSES_URL;
const apiUrlMycourses=process.env.REACT_APP__COURSES_BOUGHT_URL
export const fetchAllCourses = createAsyncThunk(
  "course/fetchAllCourses",
  async () => {
    const response = await axios.get(apiUrlAllCourses);
    return response.data;
  }
);
export const fetchMyCourses = createAsyncThunk(
  "course/fetchMyCourses",
  async (userId) => {
    const response = await axios.get(apiUrlMycourses,{
      headers:{
        userid:userId
      }
    });
    return response.data;
  }
);

const courseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{
        setSelectedCourse:(state,action)=>{
            state.selectedCourse=action.payload
        }
    },
    extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allCourses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchMyCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.MyCourses = action.payload;
      })
      .addCase(fetchMyCourses.rejected, (state) => {
        state.status = "failed";
      })
    }
})

export const {setSelectedCourse}=courseSlice.actions
export default courseSlice.reducer