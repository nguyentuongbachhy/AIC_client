import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useColors = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const getColorData = useCallback(async () => {
        const CancelToken = axios.CancelToken
        let cancel
        try {
            setIsLoading(true)
            const url = 'http://localhost:2701/color-api/get-all-colors'
            const response = await axios.get(url, {
                cancelToken: new CancelToken(c => cancel = c)
            })
            if (response?.status === 200) {
                const rows = response?.data
                setData(rows)
            }
        } catch (error) {
            if (axios.isCancel(error)) return
            setError(true)
        } finally {
            setIsLoading(false)
        }
        return () => cancel()
    }, [])

    useEffect(() => {
        setData([])
    }, [])

    useEffect(() => {
        getColorData()
    }, [getColorData])

    return { data, isLoading, error }
}

export const useInfiniteScrollColor = (id) => {
    const [data, setData] = useState([])
    const [offset, setOffset] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(true)


    const fetchData = useCallback(async () => {
        if (isLoading || !hasMore) return
        const CancelToken = axios.CancelToken
        let cancel
        try {
            setIsLoading(true)
            const url = `http://localhost:2701/color-api/get-and-count-images?offset=${offset}&limit=${process.env.REACT_APP_LIMIT}&colorId=${id}`
            const response = await axios.get(url, {
                cancelToken: new CancelToken(c => cancel = c)
            })
            if (response?.status === 200) {
                const { rows, count } = response?.data
                setData(prev => [...prev, ...rows])
                setOffset(prev => prev + parseInt(process.env.REACT_APP_LIMIT))
                if (data.length === 0 || data.length >= count) {
                    setHasMore(false)
                } else {
                    setHasMore(true)
                }
            }
        } catch (error) {
            if (axios.isCancel(error)) return
            setError(true)
        } finally {
            setIsLoading(false)
        }

        return () => cancel()

    }, [isLoading, hasMore, offset, id, data.length])

    return { data, isLoading, error, hasMore, fetchData }
}

