import React, { useEffect, useState } from "react";
import { menuItemModel } from "../../../../Interfaces"; // Verifique o caminho correto da interface
import MenuItemCard from "./MenuItemCard";
import { useGetMenuItemsQuery } from "../../../../Apis/menuItemApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setMenuItem,
  setSearchItem,
} from "../../../../Storage/Redux/menuItemSlice";
import { MainLoader } from "../Common";
import { RootState } from "../../../../Storage/Redux/store"; // Verifique o caminho correto

function MenuItemList() {
  const [sortName, setSortName] = useState("Name A - Z");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetMenuItemsQuery(null);
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);

  const sortOptions: Array<string> = [
    "Price Low - High",
    "Price High - Low",
    "Name A - Z",
    "Name Z - A",
  ];

  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchItem(e.target.value));
    setValue(e.target.value);
  };

  const handleFilters = (
    sortType: string,
    category: string,
    search: string
  ) => {
    let tempArray =
      category === "All"
        ? [...data.result]
        : data.result.filter(
            (item: menuItemModel) =>
              item.category.toLowerCase() === category.toLowerCase()
          );
    if (search) {
      const tempArray2 = [...tempArray];
      tempArray = tempArray2.filter((item: menuItemModel) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    if (sortType === "Price Low - High") {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => a.price - b.price);
    }
    if (sortType === "Price High - Low") {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => b.price - a.price);
    }
    if (sortType === "Name A - Z") {
      tempArray.sort(
        (a: menuItemModel, b: menuItemModel) =>
          a.name.toUpperCase().charCodeAt(0) -
          b.name.toUpperCase().charCodeAt(0)
      );
    }
    if (sortType === "Name Z - A") {
      tempArray.sort(
        (a: menuItemModel, b: menuItemModel) =>
          b.name.toUpperCase().charCodeAt(0) -
          a.name.toUpperCase().charCodeAt(0)
      );
    }
    return tempArray;
  };

  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilters(
        sortName,
        selectedCategory,
        searchValue
      );
      setMenuItems(tempMenuArray);
    }
  }, [searchValue, data]);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setMenuItem(data.result));
      setMenuItems(data.result);
      const tempCategoryList = ["All"];
      data.result.forEach((item: menuItemModel) => {
        if (tempCategoryList.indexOf(item.category) === -1) {
          tempCategoryList.push(item.category);
        }
      });

      setCategoryList(tempCategoryList);
    }
  }, [isLoading, data, dispatch]);

  if (isLoading) {
    return <MainLoader></MainLoader>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll(".custom-buttons");
    let localCategory;
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add("active");
        if (index === 0) {
          localCategory = "All";
        } else {
          localCategory = categoryList[index];
        }
        setSelectedCategory(localCategory);
        const tempArray = handleFilters(sortName, localCategory, searchValue);
        setMenuItems(tempArray);
      } else {
        button.classList.remove("active");
      }
    });
  };

  const handleSortClick = (i: number) => {
    setSortName(sortOptions[i]);
    const tempArray = handleFilters(
      sortOptions[i],
      selectedCategory,
      searchValue
    );
    setMenuItems(tempArray);
  };

  return (
    <div className="container">
      <h2 className="h1 fw-bold text-center mt-5" style={{ color: "#2a2b59" }}>
        Our Dishes
      </h2>
      <div>
        <div className="row justify-content-center">
          <div className="col-6">
            <ul className="nav w-100 d-flex justify-content-center align-items-center">
              {categoryList.map((categoryName, index) => (
                <li key={index} className="nav-item ms-auto">
                  <button
                    onClick={() => handleCategoryClick(index)}
                    className={`nav-link p-0 pb-2 custom-buttons fs-5 ${
                      index === 0 && "active"
                    }`}
                  >
                    {categoryName}
                  </button>
                </li>
              ))}
              <li className="nav-item dropdown ms-auto">
                <div
                  className="nav-link dropdown-toggle text-dark fs-6 border"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {sortName}
                </div>
                <ul className="dropdown-menu">
                  {sortOptions.map((sortType, index) => (
                    <li
                      key={index}
                      className="dropdown-item"
                      onClick={() => handleSortClick(index)}
                    >
                      {sortType}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row text-center justify-content-center">
        <div className="col-6 ">
          <div className="d-flex align-items-center" style={{ width: "100%" }}>
            <input
              onChange={handleChange}
              value={value}
              type={"text"}
              className="form-control rounded-pill"
              style={{
                width: "100%",
                padding: "20px 20px",
              }}
              placeholder="Search for Food Items!"
            />
            <span style={{ position: "relative", left: "-43px" }}>
              <i className="bi bi-search"></i>
            </span>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="row">
        {menuItems.length > 0 ? (
          menuItems.map((menuItem: menuItemModel, index: number) => (
            <MenuItemCard menuItem={menuItem} key={index} />
          ))
        ) : (
          <div className="row justify-content-center text-center">
            <div className="col-8">
              <h2 className="mt-5">No item found...</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuItemList;
