import React from "react";
import { useLocation } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./Payment/PaymentForm";
import OrderSummary from "./Order/OrderSummary";

function Payment() {
  const {
    state: { apiResult, userInput },
  } = useLocation();

  const stripePromise = loadStripe(
    "pk_test_51MG6xmDU3OjDrP4GJV8avgtFNNGxikOffHWtYgncDFkahat38KLX3foPPgFbk0JHNG2FmYhIpSNl2lqbnR3uEfRM00Bv0LptTW"
  );
  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-10 col-md-4">
            <h2 className="h2 text-center">Payment Information</h2>
            <hr></hr>
            <PaymentForm data={apiResult} userInput={userInput}></PaymentForm>
          </div>
          <div className="col-10 col-md-4">
            <h2 className="h2 text-center">Order Summary</h2>
            <hr></hr>
            <OrderSummary data={apiResult} userInput={userInput}></OrderSummary>
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;
