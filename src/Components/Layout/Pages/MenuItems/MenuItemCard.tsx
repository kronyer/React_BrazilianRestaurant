import React from 'react'
import { menuItemModel } from '../../../../Interfaces'
import { faker } from '@faker-js/faker';
import { useUpdateShoppingCartMutation } from '../../../../Apis/shoppingCartApi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MiniLoader from '../Common/MiniLoader';

<style></style>
interface Props{
    menuItem : menuItemModel
}

function MenuItemCard(props:Props) {
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false)
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const handleAddToCart = async (menuItemId:number) => {
    setIsAddingToCart(true);

    const response = await updateShoppingCart({menuItemId:menuItemId,
       updateQuantityBy:1,
      userId:"b2c68514-d7f8-48e9-9769-501cc703a285" })
  console.log(response)
  setIsAddingToCart(false);

  }

  return (
    <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ border:"1px solid #999", borderRadius:"40px" }}
      >
        <div className="card-body pt-2 ">
          <div className="row row justify-content-center">
            <div className='col-12'>
              <Link to={`menuItemDetails/${props.menuItem.id}`}
              style={{textDecoration:"none"}}>
              <img
              src={faker.image.food()}
              style={{borderRadius:"10%"}}
              alt=""
              className="w-100 mt-1 image-box text-center"
            />
              </Link>
            </div>
          </div>
{props.menuItem.specialTag && props.menuItem.specialTag.length > 0 && (<i
            className="bi bi-star btn btn-sm btn-warning"
            style={{
              position: "absolute",
              top: "40px",
              left: "28px",
              padding: "5px 10px",
              borderRadius: "10%",
              outline: "none !important",
              cursor: "pointer",
            }}
          >
            &nbsp; {props.menuItem.specialTag}
          </i>)}
<div className="card-footer" style={{border:"none", backgroundColor:"white"}}>
<div className="text-center">
            <Link to={`menuItemDetails/${props.menuItem.id}`}
            style={{textDecoration:"none"}}>
            <p className="card-title m-0 text-black fw-semibold fs-3">{props.menuItem.name}</p>
            </Link>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.menuItem.category}
            </p>
          </div>
          <p className="card-text" style={{ textAlign: "center", }}>
            {props.menuItem.description}
          </p>
          <div className="row text-center">
            <h4 className='ms-5 fw-bold'>${props.menuItem.price}
              
            {isAddingToCart? (<i
            onClick={() => handleAddToCart(props.menuItem.id)}
            className=" px-4 mx-5 btn btn-outline-warning"
            style={{
                color:"orange",
                border:"1px solid orange",
              top: "15px",
              right: "15px",
              padding: "5px 10px",
              outline: "none !important",
              cursor: "pointer",
            }}
          >
            <span className='spinner-border spinner-border-sm' aria-hidden="true"></span>
            <span role='status'> Adding...</span>
          </i>) : (<i
            onClick={() => handleAddToCart(props.menuItem.id)}
            className="bi px-4 mx-5 bi-cart-plus btn btn-outline-warning"
            style={{
                color:"orange",
                border:"1px solid orange",
              top: "15px",
              right: "15px",
              padding: "5px 10px",
              outline: "none !important",
              cursor: "pointer",
            }}
          >Order</i>)}
             </h4>
            
            
  </div>

          
          
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuItemCard