import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useDropdown = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const getDropdownData = useCallback(async () => {
        const CancelToken = axios.CancelToken;
        let cancel;
        try {
            setIsLoading(true);
            const url = 'http://localhost:2701/dropdown-api/get-dropdown';
            const response = await axios.get(url, {
                cancelToken: new CancelToken(c => cancel = c),
            });
            if (response?.status === 200) {
                const rows = response?.data;
                setData(rows);
            }
        } catch (error) {
            if (axios.isCancel(error)) return;
            setError(true);
        } finally {
            setIsLoading(false);
        }
        return () => cancel();
    }, []);

    useEffect(() => {
        setData([]);
    }, []);

    useEffect(() => {
        getDropdownData();
    }, [getDropdownData]);

    return { data, isLoading, error };
};
