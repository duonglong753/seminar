import React from 'react'
import Dashboard from './Dashboard'
import SideBar from './SideBar'

const DashboardPage = () => {
  return (
    <div className='flex'>
        <SideBar/>
        <Dashboard/>
    </div>
  )
}

export default DashboardPage