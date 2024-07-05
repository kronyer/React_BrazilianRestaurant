import React from "react";
import OrderListProps from "./orderListType";
import { MainLoader } from "../Common";
import { orderHeaderModel } from "../../../../Interfaces";
import noOrders from "../../../../assets/Images/noOrders.svg";
import { useNavigate } from "react-router";
import { getStatusColor } from "../../../../Helper";

function OrderList({ isLoading, orderData }: OrderListProps) {
  const navigate = useNavigate();

  return (
    <>
      {isLoading && <MainLoader></MainLoader>}
      {!isLoading && (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-10 col-md-6">
              <h2 className="text-center">
                <i
                  onClick={() => navigate(-1)}
                  className="btn btn-outline-secondary me-3 bi bi-arrow-left-short"
                  style={{ borderRadius: "50%" }}
                ></i>
                My Orders
              </h2>
              <hr></hr>
              {orderData.length > 0 ? (
                orderData.map((orderItem: orderHeaderModel, index) => {
                  const statusColor = getStatusColor(orderItem.status!);

                  return (
                    <div className="card mb-2" key={orderItem.orderHeaderId}>
                      <div className="card-body">
                        <h5 className="card-title">
                          Order Id: {orderItem.orderHeaderId}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                          {new Date(orderItem.orderDate!).toLocaleString(
                            "pt-BR",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          )}
                        </h6>
                        <br></br>
                        <p className="card-text">
                          Pickup Name: {orderItem.pickupName}
                        </p>
                        <p className="card-text">Tracking Number: brw1312513</p>
                        <div className="d-flex justify-content-between">
                          <span>Quantity: {orderItem.totalItems}</span>
                          <span>
                            Total Amount: ${orderItem.orderTotal?.toFixed(2)}
                          </span>
                        </div>
                        <br></br>
                        <div className="d-flex justify-content-between">
                          <button
                            onClick={() => {
                              navigate(
                                "/order/orderDetails/" + orderItem.orderHeaderId
                              );
                            }}
                            className="btn btn-outline-dark btn-sm"
                          >
                            Details
                          </button>
                          <span className={`text-${statusColor}`}>
                            {orderItem.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center">
                  <h4 className="text-center text-secondary">
                    You have no orders yet
                  </h4>
                  <img src={noOrders} width={"100%"} alt="noOrders"></img>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderList;
