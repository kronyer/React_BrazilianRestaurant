import React, { useEffect } from "react";
import logo from "../../assets/Images/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { cartItemModel, userModel } from "../../Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import {
  setLoggedInUser,
  userEmptyState,
} from "../../Storage/Redux/userAuthSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...userEmptyState }));
    window.location.reload();
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary d-flex align-items-center"
      data-bs-theme="white"
      style={{
        backgroundColor: "whitesmoke",
        boxShadow: "0px 3px 7px #eeeeee",
        fontSize: "1.1em",
        fontWeight: "normal",
      }}
    >
      <div className="container-fluid col-10">
        <a className="navbar-brand ps-2" href="/">
          <img src={logo} alt="logo" height={"50px"}></img>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link mx-3" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            {userData.role === "admin" ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  style={{ color: "#2a2b59" }}
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => navigate("menuItem/menuItemlist")}
                    >
                      Menu Items
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => navigate("order/myOrders")}
                    >
                      My Orders
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => navigate("order/allOrders")}
                    >
                      All Orders
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <></>
            )}
          </ul>
          <ul className="navbar-nav ms-auto align-items-center">
            <NavLink
              className="nav-link me-3"
              style={{ color: "#2a2b59" }}
              aria-current="page"
              to="/shoppingCart"
            >
              <span className="bi bi-cart fs-4  d-flex align-items-center">
                <span className="fs-6">
                  {" "}
                  {shoppingCartFromStore.length
                    ? `(${shoppingCartFromStore.length})`
                    : ""}
                </span>
              </span>
            </NavLink>
            {userData.id ? (
              <li
                className="nav-item dropdown"
                style={{ listStyle: "none", color: "#2a2b59" }}
              >
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  style={{ color: "#2a2b59" }}
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fs-4 bi bi-person-circle me-1"></i>
                  {userData.fullName?.split(" ")[0]}!
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/order/myOrders"
                      style={{ color: "#2a2b59" }}
                    >
                      My Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/myprofile"
                      style={{ color: "#2a2b59" }}
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                      style={{ color: "#2a2b59" }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li
                style={{ listStyle: "none" }}
                className="text-dark nav-item dropdown"
              >
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "#2a2b59" }}
                >
                  My Account
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/login"
                      style={{ color: "#2a2b59" }}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/register"
                      style={{ color: "#2a2b59" }}
                    >
                      Register
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
