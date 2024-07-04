import { useParams } from "react-router";
import confimedImage from "../../../../assets/Images/orderConfirmed.svg";

import React from "react";

function OrderConfirmed() {
  const { id } = useParams();
  return (
    <div className="container mt-5 ">
      <div className="row text-center justify-content-center">
        <div className="col-8">
          <h2>Your order has been confirmed!</h2>
          <img src={confimedImage} alt="Payment Confirmed" width={"40%"}></img>
          <h5 className="mt-4">Your order ID: {id}</h5>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmed;
