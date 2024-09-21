import React, { useCallback, useMemo, useRef } from 'react'
import { useInfiniteQuery } from 'react-query'
import { getAndCountImagesApi } from '../apis/imageApi'
import { ErrorPage } from '../pages'
import Card from './card'
import { CardWrapperSkeleton } from './skeleton'
const CardWrapper = () => {
    const observer = useRef(null)

    const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading }
        = useInfiniteQuery({
            queryKey: ['inf-query'],
            queryFn: ({ pageParam = 0 }) => {
                return getAndCountImagesApi({ pageParam })
            },
            getNextPageParam: (lastPage, allPages) => {
                return lastPage && Array.isArray(lastPage) && lastPage.length ? allPages.length * +process.env.REACT_APP_LIMIT : undefined
            }
        })

    const lastElementRef = useCallback((node) => {
        if (isLoading) return;

        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetching) {
                fetchNextPage()
            }
        })

        if (node) observer.current.observe(node)
    }, [fetchNextPage, hasNextPage, isFetching, isLoading])

    const imageList = useMemo(() => {
        return data?.pages?.reduce((acc, page) => {
            return Array.isArray(page) ? [...acc, ...page] : acc
        }, []) || []
    }, [data])

    console.log(data);

    if (error) return <ErrorPage />

    if (isLoading) return <CardWrapperSkeleton />

    return (
        <div className='sm:w-[32.5rem] md:w-[49rem] lg:w-[65.5rem] h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-auto'>
            {imageList.map((image, index) => (
                <div key={`${image.id}-${index}`} ref={index === imageList.length - 1 ? lastElementRef : null}>
                    <Card id={image.id} folder_id={image.folder_id} child_folder_id={image.child_folder_id} id_frame={image.id_frame} image_path={image.image_path} frame_mapping_index={image.frame_mapping_index} />
                </div>
            ))}
        </div>
    )
}

export default CardWrapper
