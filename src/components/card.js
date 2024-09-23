import React from 'react'
import { useInView } from 'react-intersection-observer'
import { createSearchParams, useNavigate } from 'react-router-dom'
import getImageName from './getImageName'
import { CardSkeleton } from './skeleton'

const Card = ({ id, folder_id, child_folder_id, id_frame, image_path, frame_mapping_index, className }) => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })

    const navigate = useNavigate()

    const handleOnclick = () => {
        navigate({
            pathname: '/image-search',
            search: `?${createSearchParams({
                imgId: id
            }).toString()}`
        })
    }

    const imageName = getImageName(folder_id, child_folder_id, id_frame, frame_mapping_index)

    return (
        inView ? (
            <div
                className={`relative w-64 rounded-md overflow-hidden cursor-pointer aspect-video ${className}`}
                onClick={handleOnclick}
            >
                <img
                    className='w-full h-full rounded-md hover:opacity-90 hover:scale-[1.01] transition-transform'
                    src={image_path}
                    alt={imageName}
                />
                <p
                    className='absolute bottom-1 left-3 text-[20px] font-medium text-black text-border-black'
                    style={{
                        WebkitTextStroke: '1px white'
                    }}
                >{imageName}</p>
            </div>
        ) : (
            <div ref={ref}>
                <CardSkeleton />
            </div>
        )
    )
}

export default Card