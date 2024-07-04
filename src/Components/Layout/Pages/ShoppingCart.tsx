import React from "react";
import { CartSummary } from "./Cart";
import { withAuth } from "../../../HOC";

function ShoppingCart() {
  return (
    <div style={{ overflowX: "hidden", minHeight: "100vh" }}>
      <CartSummary></CartSummary>
    </div>
  );
}

export default withAuth(ShoppingCart);
