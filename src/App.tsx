import { useEffect, useState } from "react";
import { Footer, Header, NotFound } from "./Components/Layout"; //uma linha só
import { userModel } from "./Interfaces";
import {
  AccessDenied,
  Home,
  Login,
  MenuItemDetails,
  MenuItemList,
  Payment,
  Register,
} from "./Components/Layout/Pages";
import { Routes } from "react-router";
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "./Apis/shoppingCartApi";
import { setShoppingCart } from "./Storage/Redux/shoppingCartSlice";
import ShoppingCart from "./Components/Layout/Pages/ShoppingCart";
import { jwtDecode } from "jwt-decode";
import { setLoggedInUser } from "./Storage/Redux/userAuthSlice";
import { RootState } from "@reduxjs/toolkit/query";
import OrderConfirmed from "./Components/Layout/Pages/Payment/OrderConfirmed";
import MyOrders from "./Components/Layout/Pages/Order/MyOrders";
import OrderDetails from "./Components/Layout/Pages/Order/OrderDetails";
import AllOrders from "./Components/Layout/Pages/Order/AllOrders";
import MenuItemUpsert from "./Components/Layout/Pages/MenuItem/MenuItemUpsert";

//App vai ser o root

function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  // @ts-expect-error root
  const userData = useSelector((state: RootState) => state.userAuthStore);

  const { data, isLoading } = useGetShoppingCartQuery(userData.id, {
    skip: skip,
  });

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwtDecode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  useEffect(() => {
    if (userData.id) setSkip(false);
  }, [userData]);

  return (
    <div
      className="text-dark App"
      style={{ overflowX: "hidden", position: "relative", minHeight: "100vh" }}
    >
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
          <Route path="/payment" element={<Payment></Payment>}></Route>
          <Route path="/order/myOrders" element={<MyOrders></MyOrders>}></Route>
          <Route
            path="/order/orderDetails/:id"
            element={<OrderDetails></OrderDetails>}
          ></Route>
          <Route
            path="/order/orderConfirmed/:id"
            element={<OrderConfirmed></OrderConfirmed>}
          ></Route>
          <Route
            path="/order/allOrders"
            element={<AllOrders></AllOrders>}
          ></Route>
          <Route
            path="/menuItem/menuItemList"
            element={<MenuItemList></MenuItemList>}
          ></Route>
          <Route
            path="/menuItem/menuItemUpsert/:id?"
            element={<MenuItemUpsert></MenuItemUpsert>}
          ></Route>
          <Route
            path="/accessdenied"
            element={<AccessDenied></AccessDenied>}
          ></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
