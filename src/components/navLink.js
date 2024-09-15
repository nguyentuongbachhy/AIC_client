import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import links from '../utils/link'

const NavLinks = () => {
    const pathname = useLocation().pathname

    return (
        <>
            {
                links.map((link) => {
                    const LinkIcon = link.icon
                    return (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`flex h-12 grow items-center justify-center gap-2 rounded-md p-3 md:p-6 font-medium text-[18px] hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:px-3
                            ${pathname === link.href && 'bg-sky-100 text-blue-600'}`}
                        >
                            <LinkIcon className='w-6' aria-hidden="true" size={20} />
                            <p className='hidden md:block'>{link.name}</p>
                        </Link>
                    )
                })
            }
        </>
    )
}

export default NavLinks