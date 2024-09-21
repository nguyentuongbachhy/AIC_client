import React from 'react'
import { useColors } from '../apis/colorApi'

const ColorBar = ({ setId }) => {
    const { data } = useColors()
    const handleOnClick = (value) => {
        setId(value)
    }

    return (
        <ul className='flex w-full items-center justify-between'>
            <li
                className='border border-gray-500 hover:border-blue-500 text-normal font-semibold p-2.5 rounded-md shadow-md cursor-pointer bg-zinc-100 hover:bg-white'
                onClick={() => handleOnClick(null)}
            >
                Default
            </li>
            {data && data.map((item, index) => (
                <li
                    key={`${item.id}-${index}`}
                    className='w-12 h-12 rounded-md border border-gray-500 shadow-md hover:border-blue-500 cursor-pointer'
                    style={{
                        background: `#${item.color_code}`
                    }}
                    onClick={() => handleOnClick(item.id)}
                />))}
        </ul>
    )
}

export default ColorBar