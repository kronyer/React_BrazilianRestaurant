import React, { useEffect, useState } from "react";
import { inputHelper, toastNotify } from "../../../../Helper";
import { setLoggedInUser } from "../../../../Storage/Redux/userAuthSlice";
import {
  useCreateMenuItemMutation,
  useGetMenuItemByIdQuery,
  useUpdateMenuItemMutation,
} from "../../../../Apis/menuItemApi";
import { useNavigate, useParams } from "react-router";

const menuItemData = {
  name: "",
  description: "",
  specialTag: "",
  category: "",
  price: "",
};
function MenuItemUpsert() {
  const { id } = useParams();
  const [imageToStore, setImageToBeStored] = useState<any>();
  const [imageToBeDisplayed, setImageToBeDisplayed] = useState<string>();
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [isLoading, setLoading] = useState(false);
  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();
  const navigate = useNavigate();
  const { data } = useGetMenuItemByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        description: data.result.description,
        specialTag: data.result.specialTag,
        category: data.result.category,
        price: data.result.price,
      };
      setMenuItemInputs(tempData);
      setImageToBeDisplayed(data.result.image);
    }
  }, [data]);

  const handleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInputs);
    setMenuItemInputs(tempData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split("/")[1]; //é o .ext
      const validImgTypes = ["jpeg", "jpg", "png"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToBeStored("");
        toastNotify("File must be less than 1 MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToBeStored("");
        toastNotify("File must be in .jpeg, .jpg or .png format");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToBeStored(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToBeDisplayed(imgUrl);
      };
      console.log(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!imageToStore && !id) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("Name", menuItemInputs.name);
    formData.append("Description", menuItemInputs.description);
    formData.append("SpecialTag", menuItemInputs.specialTag ?? "");
    formData.append("Category", menuItemInputs.category);
    formData.append("Price", menuItemInputs.price);
    if (imageToBeDisplayed) {
      formData.append("File", imageToStore);
    }

    let response;

    if (id) {
      formData.append("Id", id);
      response = await updateMenuItem({ data: formData, id });
    } else {
      response = await createMenuItem(formData);
    }
    if (response) {
      setLoading(false);
      toastNotify("Item Registered/Updated", "success");
      navigate("/menuitem/menuitemlist");
    }

    setLoading(false);
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-8 col-md-4">
          <h2 className="text-center">
            {id ? "Edit Menu Item" : "Register Menu Item"}
          </h2>
          <hr></hr>
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="form-floating mb-3">
              <input
                name="name"
                value={menuItemInputs.name}
                onChange={handleMenuItemInput}
                required
                type="text"
                className="form-control"
              ></input>
              <label>Product Name</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                name="description"
                value={menuItemInputs.description}
                onChange={handleMenuItemInput}
                className="form-control"
              ></textarea>
              <label>Product Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="specialTag"
                value={menuItemInputs.specialTag}
                onChange={handleMenuItemInput}
                type="text"
                className="form-control"
              ></input>
              <label>Special Tag</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="category"
                value={menuItemInputs.category}
                onChange={handleMenuItemInput}
                type="text"
                className="form-control"
              ></input>
              <label>Category</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="price"
                value={menuItemInputs.price}
                onChange={handleMenuItemInput}
                required
                type="number"
                className="form-control"
              ></input>
              <label>Price</label>
            </div>
            <input
              onChange={handleFileChange}
              type="file"
              className="form-control mt-3"
            />
            <div className="text-center">
              <button
                type="submit"
                style={{ width: "50%" }}
                className="btn btn-dark mt-3"
              >
                {id ? "Update" : "Register"}
              </button>
            </div>
          </form>
        </div>
        <div className="col-8 col-md-4 mt-5">
          <img
            className="rounded"
            width={"100%"}
            src={imageToBeDisplayed}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default MenuItemUpsert;
