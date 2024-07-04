import React from "react";
import {
  useDeleteMenuItemMutation,
  useGetMenuItemsQuery,
} from "../../../../Apis/menuItemApi";
import { MainLoader } from "../Common";
import { menuItemModel } from "../../../../Interfaces";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function MenuItemList() {
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const navigate = useNavigate();
  const [deleteMenuItem] = useDeleteMenuItemMutation();

  const handleMenuItemDelete = async (id: number) => {
    console.log(id);
    toast.promise(
      deleteMenuItem(id),
      {
        pending: "Processing...",
        success: "Deleted!",
        error: "Error",
      },
      {
        theme: "light",
      }
    );
  };

  return (
    <>
      {isLoading && <MainLoader></MainLoader>}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="">MenuItem List</h1>
            <button
              onClick={() => navigate("/menuitem/menuitemupsert")}
              className="btn btn-dark"
            >
              Add New
            </button>
          </div>
          <div className="p-2">
            <div className="row border">
              <div className="col-2">Image</div>
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Category</div>
              <div className="col-1">Price</div>
              <div className="col-2">Special Tag</div>
              <div className="col-1">Action</div>
            </div>
            {data.result.map((menuItem: menuItemModel, index: number) => {
              return (
                <div
                  className="row border align-items-center"
                  key={menuItem.id}
                >
                  <div className="col-2">
                    <img
                      src="https://placehold.co/150"
                      alt="no content"
                      style={{ width: "100%", maxWidth: "120px" }}
                    />
                  </div>
                  <div className="col-1">{menuItem.id}</div>
                  <div className="col-2">{menuItem.name}</div>
                  <div className="col-2">{menuItem.category}</div>
                  <div className="col-1">${menuItem.price}</div>
                  <div className="col-2">{menuItem.specialTag}</div>
                  <div className="col-6 col-md-2">
                    <button
                      onClick={() =>
                        navigate("/menuitem/menuitemupsert/" + menuItem.id)
                      }
                      className="btn btn-dark"
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button
                      onClick={() => handleMenuItemDelete(menuItem.id)}
                      className="btn btn-danger mx-2"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default MenuItemList;
