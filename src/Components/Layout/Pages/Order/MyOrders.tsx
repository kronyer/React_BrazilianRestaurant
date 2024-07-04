import React from "react";
import { withAuth } from "../../../../HOC";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { useGetAllOrdersQuery } from "../../../../Apis/orderApi";
import { MainLoader } from "../Common";
import { orderHeader } from "../../../../Interfaces";
import OrderList from "./OrderList";

function MyOrders() {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data, isLoading } = useGetAllOrdersQuery(userId);

  console.log(isLoading);
  console.log(userId);

  return (
    <>
      {isLoading && <MainLoader></MainLoader>}
      {!isLoading && (
        <OrderList isLoading={isLoading} orderData={data.result}></OrderList>
      )}
    </>
  );
}

export default withAuth(MyOrders);
