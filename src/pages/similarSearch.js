import React, { useState } from 'react'
import { Card, Input } from '../components'
import { CardWrapperSkeleton } from '../components/skeleton'

const SimilarSearch = () => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    return (
        <div className='w-full h-full flex flex-col gap-5'>
            <div>
                <Input setData={setData} setIsLoading={setIsLoading} />
            </div>
            <div className="sm:w-[34rem] md:w-[49rem] lg:w-[65.5rem] h-full flex flex-col mx-auto gap-2 overflow-y-scroll">
                <div className='w-full flex items-center justify-between'>
                    <p className="text-[32px] font-bold text-black">Similar images:</p>
                </div>
                {isLoading ? (
                    <CardWrapperSkeleton />
                ) : (
                    <div
                        style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                        }}
                        className="scrollbar-none scroll-smooth grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {data?.map((image, index) => (
                            <Card key={`${image.id}-${index}`} id={image.id} folder_id={image.folder_id} child_folder_id={image.child_folder_id} id_frame={image.id_frame} image_path={image.image_path} frame_mapping_index={image.frame_mapping_index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SimilarSearch