import React, { useState } from 'react'
import { useDropdown } from '../apis/dropdown'
import { getImagesByFoldersApi } from '../apis/imageApi'

const Input = ({ setData, setIsLoading }) => {

    const { data } = useDropdown()
    const [currentFolder, setCurrentFolder] = useState(null)
    const [subFolder, setSubFolder] = useState(null)

    const handleOnClick = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const inputData = {
            "folder_id": currentFolder,
            "subfolder_id": subFolder
        };
        const response = await getImagesByFoldersApi(inputData)
        setIsLoading(true)
        setData(response)
        setIsLoading(false)
    }

    return (
        <div className='w-full h-[4rem] grid grid-cols-4 items-center justify-between px-4 border'>
            <p className='font-bold text-center'>Folder</p>
            <div className=' p-auto'>
                <select style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                }} className='appearance-none outline-none border border-black px-2 py-1 rounded-md cursor-pointer'
                    onChange={(e) => setCurrentFolder(e.target.value)}
                >
                    <option defaultChecked value={null}>
                        Choose number of folder
                    </option>
                    {data && Object.keys(data).map((item) => (
                        <option key={item} value={item} >
                            {item}
                        </option>
                    ))}
                </select>
            </div>
            <div className="p-auto">
                <select style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                }} className={`appearance-none outline-none border border-black px-2 py-1 rounded-md p-auto ${currentFolder ? 'cursor-pointer' : 'cursor-not-allowed'}`} disabled={!currentFolder}
                    onChange={(e) => setSubFolder(e.target.value)}
                >
                    <option defaultChecked value={null} className='disabled:text-gray-500'>
                        Choose number of subfolder
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
            <button disabled={!currentFolder} className={`border border-black px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-400 text-white ${currentFolder ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={handleOnClick}>Submit</button>
        </div>
    )
}

export default Input