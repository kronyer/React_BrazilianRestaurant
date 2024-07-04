import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { toastNotify } from "../../../../Helper";
import { orderSummaryProps } from "../Order/orderSummaryProps";
import { apiResponse, cartItemModel } from "../../../../Interfaces";
import { useCreateOrderMutation } from "../../../../Apis/orderApi";
import { useNavigate } from "react-router";

const PaymentForm = ({ data, userInput }: orderSummaryProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toastNotify("Something went wrong with your payment", "error");
    } else {
      let grandTotal = 0;
      let totalItems = 0;

      const orderDetailsDTO: any = [];
      data.cartItems?.forEach((item: cartItemModel) => {
        const tempOrderDetails: any = {};
        tempOrderDetails["menuItemId"] = item.menuItem?.id;
        tempOrderDetails["quantity"] = item.quantity;
        tempOrderDetails["itemName"] = item.menuItem?.name;
        tempOrderDetails["price"] = item.menuItem?.price;
        orderDetailsDTO.push(tempOrderDetails);
        grandTotal += item.quantity! * item.menuItem?.price!;
        totalItems += item.quantity!;
      });

      const response: apiResponse = await createOrder({
        pickupName: userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        pickupEmail: userInput.email,
        totalItems: totalItems,
        orderTotal: grandTotal,
        orderDetailsDTO: orderDetailsDTO,
        stripePaymentIntentID: data.stripePaymentIntentID,
        applicationUserId: data.userId,
        status:
          result.paymentIntent.status === "succeeded" ? "Confirmed" : "Pending",
      });

      if (response) {
        if (response.data?.result.status === "Confirmed") {
          navigate(
            `/order/orderConfirmed/${response.data.result.orderHeaderId}`
          );
        } else {
          navigate("/failedPayment");
        }
      }
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="container text-center mt-3 mb-5">
        <button
          disabled={!stripe || isProcessing}
          className=" btn btn-dark w-100"
        >
          {isProcessing ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
