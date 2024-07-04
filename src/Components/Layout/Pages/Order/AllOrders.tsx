import React from "react";
import { withAuth, withAdmin } from "../../../../HOC";
import { useGetAllOrdersQuery } from "../../../../Apis/orderApi";
import { MainLoader } from "../Common";
import OrderList from "./OrderList";
import OrderListAdmin from "./OrderListAdmin";

function AllOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("");
  return (
    <>
      {isLoading && <MainLoader></MainLoader>}
      {!isLoading && (
        <OrderListAdmin
          isLoading={isLoading}
          orderData={data.result}
        ></OrderListAdmin>
      )}
    </>
  );
}

export default withAdmin(AllOrders);
