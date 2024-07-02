import React from "react";
import logo from "../../assets/Images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { cartItemModel } from "../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";

function Header() {
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="white"
      style={{
        backgroundColor: "whitesmoke",
        boxShadow: "0px 3px 7px #eeeeee",
      }}
    >
      <div className="container-fluid col-10">
        <NavLink className="navbar-brand ps-2" to="/">
          <img src={logo} alt="logo" height={"50px"}></img>
        </NavLink>
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
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item"></li>
            {/* <li className="nav-item">
          <a className="nav-link" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li> */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <form className="d-flex me-5" role="search">
          <input
            style={{ height: "35px" }}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          ></input>
          <button
            className="btn btn-outline-warning"
            style={{ color: "#2a2b59", height: "35px" }}
            type="submit"
          >
            Search
          </button>
        </form>

        <NavLink
          className="nav-link me-5"
          style={{ color: "#2a2b59" }}
          aria-current="page"
          to="/shoppingCart"
        >
          <span className="bi bi-cart fs-4">
            <span className="fs-6">
              {" "}
              {shoppingCartFromStore.length
                ? `(${shoppingCartFromStore.length})`
                : ""}
            </span>
          </span>
        </NavLink>
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
          >
            My Account
          </a>
          <ul className="dropdown-menu">
            <li>
              <NavLink className="dropdown-item" to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        </li>
      </div>
    </nav>
  );
}

export default Header;
