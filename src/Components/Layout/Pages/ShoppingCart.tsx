import React from 'react'
import { CartSummary } from './Cart'

function ShoppingCart() {
  return (
    <div style={{overflowX:"hidden", minHeight:"100vh"}}><CartSummary></CartSummary></div>
  )
}

export default ShoppingCart