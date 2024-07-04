import React from "react";
import { useParams } from "react-router";
import { useGetOrderDetailsQuery } from "../../../../Apis/orderApi";
import OrderSummary from "./OrderSummary";

function OrderDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderDetailsQuery(id);
  let userInput, orderDetails;

  console.log(isLoading);
  if (!isLoading) {
    console.log(data);
  }

  if (!isLoading && data?.result) {
    userInput = {
      name: data.result[0].pickupName,
      email: data.result[0].pickupEmail,
      phoneNumber: data.result[0].PickupPhoneNumber,
    };
    orderDetails = {
      id: data.result[0].orderHeaderId,
      cartItems: data.result[0].orderDetails,
      cartTotal: data.result[0].orderTotal,
      status: data.result[0].status,
    };
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-10 col-md-6">
          {!isLoading && orderDetails && userInput && (
            <OrderSummary
              data={orderDetails}
              userInput={userInput}
            ></OrderSummary>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
