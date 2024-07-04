import { shoppingCartModel } from "../../../../Interfaces";

export interface orderSummaryProps {
  data: {
    id?: number;
    cartItems?: shoppingCartModel[];
    cartTotal?: number;
    userId?: string;
    stripePaymentIntentID?: string;
    status?: string;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}
