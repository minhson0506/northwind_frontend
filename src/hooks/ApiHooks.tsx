import CustomError from '../classes/CustomError';
import { useMainContext } from '../contexts/MainContext';
import { OrderWithDetails } from '../interface/Order';
import { baseUrl } from '../utils/variables';

// function for fetching data from backend
const doFetch = async (url: string, options: any) => {
    try {
        const response = await fetch(url, options);
        const json = await response.json();
        return json;
    } catch (e) {
        throw new CustomError('Error when get data', 404);
    }
};

// hook for fetching orders and saving them to context
const useOrder = () => {
    const { setOrders } = useMainContext();

    const getOrders = async () => {
        const options = {
            method: 'GET',
        };
        const response = await doFetch(baseUrl + 'orders/', options);
        setOrders(response as OrderWithDetails[]);
    };

    return { getOrders };
};

export { useOrder };
