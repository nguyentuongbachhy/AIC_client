import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate, useSearchParams } from 'react-router-dom';
import { downloadCSV, findImagesByImageApi, findImagesByPartApi } from '../apis/imageApi';
import { Card } from '../components';
import { CardWrapperSkeleton, Skeleton } from '../components/skeleton';
import ErrorPage from './errorPage';

const ImageSearch = () => {
    const imgId = useSearchParams()[0].get('imgId');

    const { data, isLoading, error } = useQuery({
        queryKey: ['imageSearch', imgId],
        queryFn: () => findImagesByImageApi(imgId),
        enabled: !!imgId,
    });

    const [rectPosition, setRectPosition] = useState(null);
    const [rectSize, setRectSize] = useState({ width: 60, height: 60 });
    const imgRef = useRef(null);

    const handleMouseMove = (e) => {
        const rect = imgRef.current?.getBoundingClientRect();
        if (rect) {
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            x = Math.max(rectSize.width / 2, Math.min(x, rect.width - rectSize.width / 2));
            y = Math.max(rectSize.height / 2, Math.min(y, rect.height - rectSize.height / 2));

            setRectPosition({ x, y });
        }
    };

    const handleMouseLeave = () => {
        setRectPosition(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            setRectSize((prev) => ({ ...prev, height: Math.max(20, prev.height - 10) }));
        } else if (e.key === 'ArrowDown') {
            setRectSize((prev) => ({ ...prev, height: Math.min(288, prev.height + 10) }));
        } else if (e.key === 'ArrowLeft') {
            setRectSize((prev) => ({ ...prev, width: Math.max(20, prev.width - 10) }));
        } else if (e.key === 'ArrowRight') {
            setRectSize((prev) => ({ ...prev, width: Math.min(512, prev.width + 10) }));
        }
    };

    const [rows, setRows] = useState(null);
    const [isClickLoading, setIsClickLoading] = useState(false);

    const handleOnClick = async (e) => {
        e.preventDefault();
        setIsClickLoading(true);
        const objectData = {
            imgId: imgId,
            x1: 2.5 * (rectPosition.x - rectSize.width / 2),
            x2: 2.5 * (rectPosition.x + rectSize.width / 2),
            y1: 2.5 * (rectPosition.y - rectSize.height / 2),
            y2: 2.5 * (rectPosition.y + rectSize.height / 2),
        };

        const newRows = await findImagesByPartApi(objectData);
        setRows(newRows);
        setIsClickLoading(false);
    };

    const handleDownloadExcel = async (e) => {
        e.preventDefault()
        const res = await downloadCSV(data)
        console.log(res)
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (isLoading) {
            setRows(null);
        }
    }, [isLoading]);

    if (!imgId) return <Navigate to="/" replace />;

    if (error) return <ErrorPage />;

    if (isLoading) {
        return (
            <div className="w-full h-full flex flex-col gap-10 pt-5 overflow-y-scroll scroll-smooth">
                <Skeleton className="w-[32rem] h-[18rem] rounded-md mx-auto" />
                <div className="sm:w-[32.5rem] md:w-[49rem] lg:w-[65.5rem] h-full flex flex-col mx-auto gap-2">
                    <div className='w-full flex items-center justify-between'>
                        <p className="text-[32px] font-bold text-black">Similar images:</p>
                        <button className='px-2 py-1 border rounded-md'>Download</button>
                    </div>
                    <CardWrapperSkeleton />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col gap-10 pt-5 overflow-y-scroll scroll-smooth">
            <div
                className="relative w-[32rem] h-[18rem] rounded-md cursor-pointer mx-auto"
                ref={imgRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleOnClick}
            >
                <Card id={data[0].id} folder_id={data[0].folder_id} child_folder_id={data[0].child_folder_id} id_frame={data[0].id_frame} image_path={data[0].image_path} frame_mapping_index={data[0].frame_mapping_index} className="w-full h-full rounded-md transition-all duration-300" />
                {rectPosition && (
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"
                        style={{
                            clipPath: `polygon(
                                0% 0%,
                                100% 0%,
                                100% 100%,
                                0% 100%,
                                0% ${rectPosition.y - rectSize.height / 2}px,
                                ${rectPosition.x - rectSize.width / 2}px ${rectPosition.y - rectSize.height / 2}px,
                                ${rectPosition.x - rectSize.width / 2}px ${rectPosition.y + rectSize.height / 2}px,
                                ${rectPosition.x + rectSize.width / 2}px ${rectPosition.y + rectSize.height / 2}px,
                                ${rectPosition.x + rectSize.width / 2}px ${rectPosition.y - rectSize.height / 2}px,
                                0% ${rectPosition.y - rectSize.height / 2}px
                            )`,
                        }}
                    />
                )}
            </div>

            <div className="sm:w-[32.5rem] md:w-[49rem] lg:w-[65.5rem] h-full flex flex-col mx-auto gap-2">
                <div className='w-full flex items-center justify-between'>
                    <p className="text-[32px] font-bold text-black">Similar images:</p>
                    <button className='px-2 py-1 border rounded-md' onClick={handleDownloadExcel}>Download</button>
                </div>
                {isClickLoading ? (
                    <CardWrapperSkeleton />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {(rows || data)?.map((image, index) => (
                            <Card key={`${image.id}-${index}`} id={image.id} folder_id={image.folder_id} child_folder_id={image.child_folder_id} id_frame={image.id_frame} image_path={image.image_path} frame_mapping_index={image.frame_mapping_index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageSearch;
