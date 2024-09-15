import React, { useEffect, useRef, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import getImageName from './getImageName'
import { CardSkeleton } from './skeleton'

const Card = ({ id, folder_id, child_folder_id, id_frame, image_path, frame_mapping_index, className }) => {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setInView(true)
                }
            })
        }, {
            threshold: 0.5
        })

        if (ref?.current) {
            observer.observe(ref.current)
        }
        return () => {
            observer.disconnect()
        }
    }, [])

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
                className={`relative w-64 h-36 rounded-md overflow-hidden cursor-pointer ${className}`}
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