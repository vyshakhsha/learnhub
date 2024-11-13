import React from "react";
import { useEffect } from "react";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { toast, ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import { checkoutCart, fetchCartItems } from "../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "../Assets/Styles/Checkout.scss";

export default function Checkout() {
  const cartData = useSelector((state) => state.cart.cartItems);
  const userid = useSelector((state) => state.user.userData.userId);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const totalAmount = cartData.reduce((acc, item) => acc + item.price, 0);

  const handleClick =async () => {
    await Promise.all(cartData.map((item) => dispatch(checkoutCart(item.itemId))));
    await dispatch(fetchCartItems(userid));
  };

  useEffect(() => {
    if (cartData.length === 0) {
      toast.success("Item purchased successfully!", { position: "top-center" });
      setTimeout(() => {
        navigate('/MyCourses');
      }, 3000);
    }
  }, [cartData,navigate])
  return (
    <>
      <NavBar />
      <ToastContainer />
      <h2>Complete Payment</h2>
      <Box
        sx={{
          width: "100%",
          paddingBottom: "2%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Paper className="checkout-container">
          <Typography
            className="course-name"
            gutterBottom
            component="div"
          >
            Total items in Cart : {cartData.length}
          </Typography>
          <Typography
            className="course-name"
            gutterBottom
            component="div"
          >
            Total Amount : ₹{totalAmount}
          </Typography>
          <Button
          className="button"
            variant="contained"
            type="submit"
            sx={{
              marginTop: "8px",
              "&:disabled": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
            onClick={() => {
              if (window.confirm("Press ok to complete the payment "))
                handleClick();
            }}
          >
            Make Payment
          </Button>
        </Paper>
      </Box>
    </>
  );
}
