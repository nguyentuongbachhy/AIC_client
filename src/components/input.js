import React, { useState } from 'react'
import { useDropdown } from '../apis/dropdown'
import { getImagesByFoldersApi } from '../apis/imageApi'

const Input = ({ setData, setIsLoading }) => {

    const { data } = useDropdown()
    const [currentFolder, setCurrentFolder] = useState(null)
    const [subFolder, setSubFolder] = useState(null)
    const [left, setLeft] = useState(null)
    const [right, setRight] = useState(null)



    const handleOnClick = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const inputData = {
            "folder_id": currentFolder,
            "subfolder_id": subFolder,
            "left": left,
            "right": right
        };
        const response = await getImagesByFoldersApi(inputData)
        setIsLoading(true)
        setData(response)
        setIsLoading(false)
    }

    return (
        <div className='w-full h-[6rem] grid grid-cols-4 items-center justify-between px-4 border'>
            <div className='w-full p-auto flex flex-col items-start gap-0.5'>
                <label htmlFor='folder_id' className='font-bold text-center'>Folder:</label>
                <select
                    style={{
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                    }}
                    className='scrollbar-none outline-none border border-black px-2 py-1 rounded-md cursor-pointer'
                    onChange={(e) => setCurrentFolder(e.target.value)}
                    id='folder_id'
                >
                    <option defaultChecked value={null}>
                        Choose number
                    </option>
                    {data && Object.keys(data).map((item) => (
                        <option key={item} value={item} >
                            {item}
                        </option>
                    ))}
                </select>
            </div>
            <div className='w-full p-auto flex flex-col items-start gap-0.5'>
                <label htmlFor='subfolder_id' className='font-bold text-center'>Subfolder:</label>
                <select
                    style={{
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                    }}
                    className={`scrollbar-none outline-none border border-black px-2 py-1 rounded-md p-auto ${currentFolder ? 'cursor-pointer' : 'cursor-not-allowed'}`} disabled={!currentFolder}
                    onChange={(e) => setSubFolder(e.target.value)}
                    id='subfolder_id'
                >
                    <option defaultChecked value={null} className='disabled:text-gray-500'>
                        Choose number
                    </option>
                    {currentFolder && data[currentFolder].map((item) => (
                        <option key={item} value={item} onClick={(e) => {
                            setCurrentFolder(e.target.value)
                        }}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
            <div className='w-[8.25rem] flex flex-col gap-2'>
                <div className='w-full p-auto flex justify-between items-center gap-0.5'>
                    <label htmlFor="left_id" className='font-bold text-center'>From: </label>
                    <input
                        type='number'
                        id='left_id'
                        disabled={!subFolder}
                        className={`w-20 h-10 outline-none border border-black px-2 rounded-md ${subFolder ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        onChange={(e) => setLeft(e.target.value)}
                    />
                </div>
                <div className='w-full p-auto flex justify-between items-center gap-0.5'>
                    <label htmlFor="right_id" className='font-bold text-center'>To: </label>
                    <input
                        type='number'
                        id='right_id'
                        disabled={!subFolder}
                        className={`w-20 h-10 outline-none border border-black px-2 rounded-md ${subFolder ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        onChange={(e) => setRight(e.target.value)}
                    />
                </div>
            </div>
            <button disabled={!currentFolder} className={`border border-black px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-400 text-white ${currentFolder ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={handleOnClick}>Submit</button>
        </div>
    )
}

export default Input