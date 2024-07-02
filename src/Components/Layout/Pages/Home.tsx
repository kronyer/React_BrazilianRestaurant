import React from 'react'
import { MenuItemList } from './MenuItems'
import Banner from './Common/Banner'

function Home() {
  return (
    <div>
      <div className='container-fluid ps-0 ms-0'>
        <Banner></Banner>
        <MenuItemList></MenuItemList>
      </div>
      </div>
  )
}

export default Home