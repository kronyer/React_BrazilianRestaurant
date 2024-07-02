import { useEffect, useState } from "react";
import { Footer, Header, NotFound } from "./Components/Layout"; //uma linha só
import { menuItemModel } from "./Interfaces";
import {
  Home,
  Login,
  MenuItemDetails,
  Register,
} from "./Components/Layout/Pages";
import { Routes } from "react-router";
import { Route } from "react-router";
import { UseDispatch, useDispatch } from "react-redux";
import { useGetShoppingCartQuery } from "./Apis/shoppingCartApi";
import { setShoppingCart } from "./Storage/Redux/shoppingCartSlice";
import ShoppingCart from "./Components/Layout/Pages/ShoppingCart";

//App vai ser o root
function App() {
  const dispatch = useDispatch();

  const { data, isLoading } = useGetShoppingCartQuery(
    "b2c68514-d7f8-48e9-9769-501cc703a285"
  );

  useEffect(() => {
    if (!isLoading) {
      console.log(data.result);
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  return (
    <div className="text-dark App" style={{ overflowX: "hidden" }}>
      <Header></Header>
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails></MenuItemDetails>}
          ></Route>
          <Route
            path="/shoppingCart"
            element={<ShoppingCart></ShoppingCart>}
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
