import React from 'react'
import notFound from "../../assets/Images/notFound.svg"

function NotFound() {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 text-center mt-5' >
          <img src={notFound} alt='not found' style={{height:"80%"}}></img>
          <h2 className='text-dark mt-4'>Page Not Found</h2>
        </div>
      </div>
      </div>
  )
}

export default NotFound