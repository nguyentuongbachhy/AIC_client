import axios from "axios";

export const getAndCountImagesApi = async ({ pageParam }) => {
    try {
        const url = `http://localhost:2701/image-api/get-and-count-images?offset=${pageParam}&limit=${process.env.REACT_APP_LIMIT}`
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

export const findImagesByImageApi = async (imgId) => {
    try {
        const url = `http://localhost:5001/image-search?imgId=${imgId}&k=100`
        const response = await axios.get(url)
        if (response?.status === 200) {
            const rows = response?.data?.results
            return rows
        }
        return null
    } catch (error) {
        return null
    }
}

export const findImagesByTextApi = async (text) => {
    try {
        const url = `http://localhost:5001/text-search?query=${text}&k=400`
        const response = await axios.get(url)
        if (response?.status === 200) {
            const rows = response?.data?.results
            return rows
        }
        return null
    } catch (error) {
        return null
    }
}

export const findImagesByPartApi = async (data) => {
    try {
        const url = `http://localhost:5001/similar-part-search?imgId=${data.imgId}&x1=${data.x1}&x2=${data.x2}&y1=${data.y1}&y2=${data.y2}&k=400`
        const response = await axios.get(url)
        if (response?.status === 200) {
            const rows = response?.data?.results
            return rows
        }
        return null
    } catch (error) {
        return null
    }
}

export const downloadExcel = async (data) => {
    try {
        const url = `http://localhost:5001/download-excel`;
        const response = await axios.post(url, data, {
            responseType: 'blob',  // Ensure the response type is 'blob' for file downloads
        });
        if (response?.status === 200) {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'output.xlsx'); // Name of the downloaded file
            document.body.appendChild(link);
            link.click();  // Simulate a click to trigger the download
            link.remove();  // Remove the link element after the download is triggered
            return 1;
        }
        return 0;
    } catch (error) {
        console.error("Error downloading Excel file: ", error);  // Log errors if any
        return 0;
    }
};
