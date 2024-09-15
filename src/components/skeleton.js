const Skeleton = ({ className }) => {
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
        <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-2">
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