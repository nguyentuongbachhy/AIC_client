import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <Link
            to='/'
            className='w-full bg-blue-600 h-20 items-center justify-center rounded-md p-4 flex leading-0 text-white font-bold'>
            <p className='text-[20px] md:text-[28px]'>WORRIER</p>
        </Link>
    )
}

export default Logo