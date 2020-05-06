import axios, {AxiosResponse} from 'axios';
import {Product} from "../../../shared/model/Product";

const API_URL = process.env.REACT_APP_PUBLIC_API_URL;

export const getProduct = (storeViewId: string, productId: string): Promise<Product> => {
    return axios.get(`${API_URL!}/stores/${storeViewId}/products?scan_code=${productId}`)
        .then((response: AxiosResponse) => response.data);
};