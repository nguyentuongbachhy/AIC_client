import React from 'react'
import Logo from './logo'
import NavLinks from './navLink'

const Dashboard = () => {
    return (
        <div className='w-full h-full border gap-2 flex flex-col rounded-md'>
            <Logo />
            <div className='h-64 gap-2 flex flex-col'>
                <NavLinks />
            </div>
        </div>
    )
}

export default Dashboard