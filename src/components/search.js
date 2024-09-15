import React, { useState } from 'react'
import { findImagesByTextApi } from '../apis/imageApi'
import icons from '../utils/icons'

const { TbSearch } = icons
const Search = ({ setData, setIsLoading }) => {

    const [text, setText] = useState(null)

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            setData(null)
            setIsLoading(true)
            const response = await findImagesByTextApi(text)
            setData(response)
            setIsLoading(false)
        }
    }

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-400 focus:border-blue-500 outline-none py-[9px] pl-10 text-normal outline-2 placeholder:text-gray-500"
                placeholder='Search ...'
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <TbSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    )
}

export default Search