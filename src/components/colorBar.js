import React, { useEffect, useState } from 'react'
import { getAllColorsApi } from '../apis/colorApi'

const ColorBar = ({ setId }) => {
    const [rows, setRows] = useState([])

    useEffect(() => {
        const getAllColors = async () => {
            const response = await getAllColorsApi()
            setRows(response);
        }
        getAllColors()
    }, [])

    const handleOnClick = (id) => {
        setId(id)
    }

    return (
        <ul className='flex w-full items-center justify-between'>
            <li
                className='border border-gray-500 hover:border-blue-500 text-normal font-semibold p-2.5 rounded-md shadow-md cursor-pointer bg-zinc-100 hover:bg-white'
                onClick={() => handleOnClick(null)}
            >
                Default
            </li>
            {rows.map((item, index) => (
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