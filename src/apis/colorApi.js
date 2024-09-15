import axios from "axios";

export const getAllColorsApi = async () => {
    try {
        const url = 'http://localhost:2701/color-api/get-all-colors'
        const response = await axios.get(url)
        if (response?.status === 200) {
            const rows = response?.data || []
            return rows
        }
        return null
    } catch (error) {
        return null
    }
}

export const getAndCountImagesByColorsApi = async ({ id, pageParam }) => {
    try {
        const url = `http://localhost:2701/color-api/get-and-count-images?offset=${pageParam}&limit=${process.env.REACT_APP_LIMIT}&colorId=${id}`
        const response = await axios.get(url)
        if (response?.status === 200) {
            const rows = response?.data?.rows || []
            return rows
        }
        return null
    } catch (error) {
        return null
    }
}