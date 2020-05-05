import axios, {AxiosResponse} from 'axios';
import {Category} from "../../../shared/model/Category";
import {Product} from "../../../shared/model/Product";

const API_URL = process.env.REACT_APP_PUBLIC_API_URL;

export const getCategories = (storeViewId: string): Promise<Array<Category>> => {
    return axios.get(`${API_URL!}/stores/${storeViewId}/categories`)
        .then((response: AxiosResponse) => response.data);
};

export const getProducts = (storeViewId: string, categoryId: string): Promise<Array<Product>> => {
    return axios.get(`${API_URL!}/stores/${storeViewId}/products/search?category_id=${categoryId}`)
        .then((response: AxiosResponse) => response.data.results);
};