import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../Redux/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CartIcon() {
  const cartCount = useSelector((state) => state.cart.cartItems.length);
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.user.userData.userId);
  useEffect(() => {
    dispatch(fetchCartItems(userid));
  }, [userid,dispatch]);
  const navigate =useNavigate()
  return (
    <div onClick={()=>navigate('/CartDetails')}>
      <ShoppingCartIcon
        sx={{ marginRight: "20px", fontSize: "2rem" ,cursor: "pointer"}}
        className="cartIcon" 
      />
      {cartCount > 0 && <p className="cartCount">{cartCount}</p>}
    </div>
  );
}
