import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useGetMenuItemByIdQuery } from "../../../Apis/menuItemApi";
import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";
import { MainLoader } from "./Common";
import { toastNotify } from "../../../Helper";
import { userModel } from "../../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

function MenuItemDetails() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const { menuItemId } = useParams();
  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const userData: userModel = useSelector(
    // @ts-expect-error Login?
    (state: RootState) => state.userAuthStore
  );

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("https://foodish-api.com/api");
        const data = await response.json();
        setImageUrl(data.image);
      } catch (error) {
        error;
      }
    };
    fetchImage();
  }, []);

  const handleQuantity = (counter: number) => {
    let newQuantity = quantity + counter;

    if (newQuantity == 0) {
      newQuantity = 1;
    }

    setQuantity(newQuantity);
    return;
  };

  const handleAddToCart = async (menuItemId: number) => {
    if (!userData.id) {
      navigate("/login");
      return;
    }
    setIsAddingToCart(true);

    const response = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
      userId: userData.id,
    });
    if (response.data && response.data.isSuccess) {
      toastNotify("Item Added To Cart");
    }
    setIsAddingToCart(false);
  };

  return (
    <div className="container mt-5 text-dark">
      {!isLoading ? (
        <div className="row justify-content-center">
          <div className="col-12 col-md-4">
            <h1 className="d-flex align-items-center">
              <i
                onClick={() => navigate(-1)}
                className="btn text-center justify-content-center align-items-center btn-outline-secondary me-3 bi bi-arrow-left-short"
                style={{ borderRadius: "50%", width: "40px", height: "40px" }}
              ></i>
              {data.result?.name}
            </h1>
            <p className="badge bg-secondary ms-1">{data.result.category}</p>{" "}
            <span className="fw-bold h5">{data.result?.specialTag}</span>
            <h3 className="mt-4">Description</h3>
            <p>{data.result.description}</p>
            <div className="mt-5">
              <span
                className="me-4 h4 fw-semibold"
                style={{ marginBottom: "0px" }}
              >
                ${data.result.price}
              </span>
              <div
                style={{ border: "1px solid black" }}
                className=" align-items-center btn-group"
                role="group"
                aria-label="Counter"
              >
                <button
                  onClick={() => {
                    handleQuantity(-1);
                  }}
                  type="button"
                  className="btn btn-outline-dark"
                  id="decrement"
                >
                  -
                </button>
                <span
                  style={{ width: "40px" }}
                  className="text-center"
                  id="counter"
                >
                  {quantity}
                </span>
                <button
                  onClick={() => {
                    handleQuantity(+1);
                  }}
                  type="button"
                  className="btn btn-outline-dark"
                  id="increment"
                >
                  +
                </button>
              </div>
              <div className="row">
                <div className="col-10 text-start">
                  {isAddingToCart ? (
                    <button
                      disabled
                      onClick={() => handleAddToCart(data.result?.id)}
                      className="btn-dark btn mt-3 me-2 ms-0 mb-4"
                    >
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                      <span role="status"> Adding...</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(data.result?.id)}
                      className="btn-dark btn mt-3 me-2 ms-0 mb-4"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 text-center">
            <img
              className="image"
              width={"100%"}
              src="https://placehold.co/350x400"
            ></img>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <MainLoader></MainLoader>
        </div>
      )}
    </div>
  );
}

export default MenuItemDetails;
