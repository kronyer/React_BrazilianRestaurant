import React, { useState } from "react";
import { orderSummaryProps } from "./orderSummaryProps";
import { cartItemModel } from "../../../../Interfaces";
import { getStatusColor } from "../../../../Helper";
import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useUpdateOrderHeaderMutation } from "../../../../Apis/orderApi";
import { MainLoader } from "../Common";

function OrderSummary({ data, userInput }: orderSummaryProps) {
  const statusColor = getStatusColor(data.status!);
  const navigate = useNavigate();
  // @ts-expect-error RootState
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const [loading, setIsLoading] = useState(false);
  const [updateOrderHeader] = useUpdateOrderHeaderMutation();

  const nextStatus: any =
    data.status! === "Confirmed"
      ? { color: "info", value: "Being Cooked" }
      : data.status! === "Being Cooked"
      ? { color: "warning", value: "Ready for Pickup" }
      : data.status! === "Ready for Pickup" && {
          color: "success",
          value: "Completed",
        };

  const handleNextStatus = async () => {
    setIsLoading(true);
    await updateOrderHeader({
      orderHeaderId: data.id,
      status: nextStatus.value,
    });
    setIsLoading(false);
  };

  const handleCancel = async () => {
    setIsLoading(true);
    await updateOrderHeader({
      orderHeaderId: data.id,
      status: "Cancelled",
    });

    setIsLoading(false);
  };

  return (
    <div>
      {loading && <MainLoader></MainLoader>}
      {!loading && (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <h2>Order Detail</h2>
            <span className={`btn btn-outline-${statusColor}`}>
              {data.status}
            </span>
          </div>
          <hr></hr>
          <ul className="list-group justify-content-center mt-4">
            <li className="list-group-item">Name: {userInput.name} </li>
            <li className="list-group-item">Email: {userInput.email}</li>
            <li className="list-group-item">Phone: {userInput.phoneNumber} </li>
          </ul>
          <div className="border rounded py-2 my-4 px-2">
            <h4 className="h4">Menu Items</h4>
            <div className="p-3">
              {data.cartItems?.map((cartItem: cartItemModel, index: number) => {
                return (
                  <div className="d-flex" key={index}>
                    <div className="d-flex w-100 justify-content-between">
                      <p>{cartItem.menuItem?.name}</p>
                      <p>
                        {cartItem.menuItem?.price} x {cartItem.quantity} =
                      </p>
                    </div>
                    <p style={{ width: "70px", textAlign: "right" }}>
                      $
                      {(cartItem.menuItem?.price ?? 0) *
                        (cartItem.quantity ?? 0)}
                    </p>
                  </div>
                );
              })}

              <hr />
              <h4 className="h4" style={{ textAlign: "right" }}>
                ${data.cartTotal?.toFixed(2)}
              </h4>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-dark" onClick={() => navigate(-1)}>
              Back To Orders
            </button>
            {userData.role == "admin" && (
              <div>
                {data.status! !== "Cancelled" &&
                  data.status! !== "Completed" && (
                    <button
                      className="btn btn-danger mx-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )}

                <button
                  className={`btn btn-${nextStatus.color} mx-2`}
                  onClick={handleNextStatus}
                >
                  {nextStatus.value}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default OrderSummary;
