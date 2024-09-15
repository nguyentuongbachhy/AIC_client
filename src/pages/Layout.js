import React from 'react'
import { Outlet } from 'react-router-dom'
import { Dashboard } from '../components'

const Layout = () => {
    return (
        <div className='w-[100vw] h-[100vh] bg-gray-50 grid grid-cols-5 gap-2 p-2'>
            <div className='col-span-1 px-2'>
                <Dashboard />
            </div>
            <div className='col-span-4 w-full h-full overflow-hidden'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout