export const Skeleton = ({ className }) => {
    return (
        <div className={`bg-gray-200 border rounded-md shadow-md animate-pulse ${className}`} />
    )
}

export const CardSkeleton = ({ className }) => {
    return (
        <Skeleton className={`w-64 h-36 ${className}`} />
    )
}

export const CardWrapperSkeleton = () => {
    return (
        <div className="sm:w-[34rem] md:w-[49rem] lg:w-[65.5rem] h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-auto">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    )
}