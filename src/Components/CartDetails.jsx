import React from "react";
import { useEffect} from "react";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { fetchAllCourses } from "../Redux/courseSlice";
// import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Typography from "@mui/material/Typography";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Button from "@mui/material/Button";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
// import { removeCartItem } from "../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "../Assets/Styles/CartDetails.scss";

export default function CartDetails() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  const allCourseData = useSelector((state) => state.course.allCourses);
  const cartData = useSelector((state) => state.cart.cartItems);

  const courseWithCartstatus = allCourseData.map((course) =>{
    const cartItem=cartData.find((cartItem)=>course.id===cartItem.courseId)
    return{
      ...course,
      inCart: cartData.some((cartItem) => cartItem.courseId === course.id),
      cartItemId:cartItem?cartItem.itemId:null
    };
  } )
   
  if (cartData.length !== 0)
    return (
  <>
      <NavBar />
      <h2 style={{ marginBottom: 0, paddingBottom: 0 }}>Cart Items</h2>
      <Box sx={{ width: "100%", paddingBottom: "2%",display:"flex",alignItems:"center"  }}>
        <div className="cart-container">
          {courseWithCartstatus.map(
            (course,index) =>
              course.inCart && (
                <Paper className="cart-item" key={index}>
                  <div className="course-image">
                    <img src={course.image + "&w=800&h=600&fit=crop"} alt="course" />
                  </div>
                  <Typography
                    className="course-name"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {course.courseName}
                  </Typography>
                  <Typography
                    className="course-price"
                    gutterBottom
                    variant="h6"
                    component="div"
                  >
                    ₹{course.price}
                  </Typography>
                </Paper>
              )
          )}
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "230px",
              marginTop: "8px",
              "&:disabled": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
            onClick={()=>{navigate('/Checkout')}}
          >
            Checkout <ShoppingCartCheckoutIcon />
          </Button>
        </div>
      </Box>
      </>
    );
  else {
    return (
      <>
        <NavBar />
        <ProductionQuantityLimitsIcon
          sx={{ paddingTop: "10%", fontSize: "50px" }}
        />
      </>
    );
  }
}
