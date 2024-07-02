import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartItemModel } from "../../../../Interfaces";
import { RootState } from "../../../../Storage/Redux/store";
import cartImage from "../../../../assets/Images/empty-cart.png";
import {
  removeFromCart,
  updateQuantity,
} from "../../../../Storage/Redux/shoppingCartSlice";
import { useUpdateShoppingCartMutation } from "../../../../Apis/shoppingCartApi";
import { inputHelper } from "../../../../Helper";

function CartSummary() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  let grandTotal = 0;
  let totalItems = 0;

  const initialUserData = {
    name: "",
    email: "",
    phoneNumber: "",
  };
  const [userInput, setUserInput] = useState(initialUserData);

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  shoppingCartFromStore?.map((cartItem: cartItemModel) => {
    totalItems += cartItem.quantity ?? 0;
    grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
    return null;
  });

  if (!shoppingCartFromStore || shoppingCartFromStore.length === 0) {
    return (
      <div className="mt-4 row text-center align-items-center justify-content-center">
        <div className="col-8">
          <img src={cartImage} width={"50%"}></img>
          <h3 className="fw-semibold text-dark">Your cart is empty...</h3>
        </div>
      </div>
    );
  }

  const handleQuantity = (
    updateQuantityBy: number,
    cartItem: cartItemModel
  ) => {
    if (
      (updateQuantityBy === -1 && cartItem.quantity === 1) ||
      updateQuantityBy === 0
    ) {
      updateShoppingCart({
        menuItemId: cartItem.menuItem?.id,
        updateQuantityBy: 0,
        userId: "b2c68514-d7f8-48e9-9769-501cc703a285",
      });
      dispatch(removeFromCart({ cartItem, quantity: 0 }));
    } else {
      console.log(updateQuantityBy);
      console.log(cartItem);
      updateShoppingCart({
        menuItemId: cartItem.menuItem?.id,
        updateQuantityBy: updateQuantityBy,
        userId: "b2c68514-d7f8-48e9-9769-501cc703a285",
      });
      dispatch(
        updateQuantity({
          cartItem,
          quantity: cartItem.quantity! + updateQuantityBy,
        })
      );
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div className="mt-5 row justify-content-center text-dark">
      <div className="col-5 col-md-4">
        <h2 className="text-center">Order summary</h2>
        <hr></hr>
        <ul className="list-group">
          {shoppingCartFromStore.map(
            (cartItem: cartItemModel, index: number) => (
              <li key={index} className="list-group-item">
                <div className="row">
                  <div className="col-10 col-md-4">
                    <img
                      style={{ width: "100%" }}
                      src="https://placehold.co/150x150"
                      alt="img"
                    />
                  </div>
                  <div className="col-10 col-md-8">
                    <span className="text-end">
                      $
                      {(cartItem.quantity! * cartItem.menuItem!.price).toFixed(
                        2
                      )}
                    </span>
                    <h2 className="h2">{cartItem.menuItem?.name}</h2>
                    <p className="h3">${cartItem.menuItem?.price}</p>
                    <div className="row align-items-center">
                      <div className="col-10 col-md-6">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow">
                            <span
                              role="button"
                              onClick={() => handleQuantity(-1, cartItem)}
                            >
                              <i
                                onClick={() => handleQuantity(-1, cartItem)}
                                className="bi bi-dash-circle-fill"
                              ></i>
                            </span>
                            <span className="mx-2">{cartItem.quantity}</span>
                            <span
                              role="button"
                              onClick={() => handleQuantity(1, cartItem)}
                            >
                              <i
                                onClick={() => handleQuantity(+1, cartItem)}
                                className="bi bi-plus-circle-fill"
                              ></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-10 col-md-6 text-end">
                        <button
                          onClick={() => handleQuantity(0, cartItem)}
                          className="btn btn-danger btn-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
      <div className="col-5 col-md-4 mx-5 text-dark">
        <h2 className="text-center">Pickup Details</h2>
        <form onSubmit={handleSubmit}>
          <hr></hr>
          <div className="mb-3">
            <label className="form-label">Pickup Name</label>
            <input
              value={userInput.name}
              type="text"
              className="form-control"
              name="name"
              placeholder="Your Name Here..."
              onChange={handleUserInput}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Pickup Email</label>
            <input
              value={userInput.email}
              type="email"
              name="email"
              className="form-control"
              placeholder="Your Email Here..."
              onChange={handleUserInput}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Pickup Phone</label>
            <input
              value={userInput.phoneNumber}
              type="tel"
              name="phoneNumber"
              className="form-control"
              placeholder="Your Phone Here..."
              onChange={handleUserInput}
              required
            ></input>
          </div>
          <div className="border p-4 text-center rounded">
            <p className="fw-bold">Total - ${grandTotal}</p>
            <p className="fw-semibold mt-0">{totalItems} item(s)</p>
          </div>
          <div className="text-center mt-3">
            {loading ? (
              <button className="btn btn-lg btn-dark" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status"> Placing Order...</span>
              </button>
            ) : (
              <button className="btn btn-lg btn-dark ">Place Order</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CartSummary;
