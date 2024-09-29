import React, { useState } from 'react'
import { Card, Search } from '../components'
import { CardWrapperSkeleton } from '../components/skeleton'
const TextSearch = () => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(null)


    return (
        <div className='w-full h-full flex flex-col gap-5'>
            <Search setData={setData} setIsLoading={setIsLoading} />
            <div className='w-full h-full flex flex-col overflow-y-scroll'>
                <div className='sm:w-[34rem] md:w-[49rem] lg:w-[65.5rem] flex flex-col mx-auto gap-2'>
                    <p className='text-[32px] font-bold text-black'>Results:</p>
                    {isLoading ? <CardWrapperSkeleton /> : (
                        <div className='scrollbar-none grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                            {data?.map((image, index) => (
                                <Card key={`${image.id}-${index}`} id={image.id} folder_id={image.folder_id} child_folder_id={image.child_folder_id} id_frame={image.id_frame} image_path={image.image_path} frame_mapping_index={image.frame_mapping_index} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TextSearch