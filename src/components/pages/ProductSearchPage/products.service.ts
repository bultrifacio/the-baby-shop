import axios, {AxiosResponse} from 'axios';
import {Category} from "../../../shared/model/Category";
import get from 'lodash/get';
import {FilterPayload} from "../../../shared/model/FilterPayload";
import {ProductSearch} from "../../../shared/model/ProductSearch";

const API_URL = process.env.REACT_APP_PUBLIC_API_URL;

export const getCategories = (storeViewId: string): Promise<Array<Category>> => {

    if (storeViewId.length === 0) return Promise.reject();

    return axios.get(`${API_URL!}/stores/${storeViewId}/categories`)
        .then((response: AxiosResponse) => response.data);
};

export const getProducts = (storeViewId: string, filtersPayload?: FilterPayload): Promise<ProductSearch> => {

    if (storeViewId.length === 0) return Promise.reject();

    const filters = `filters=${get(filtersPayload, 'filters', '')}`;
    const withText = `with_text=${get(filtersPayload, 'withText', '')}`;
    const categoryId = `category_id=${get(filtersPayload, 'categoryId', '')}`;
    const order = `order=${get(filtersPayload, 'order', '')}`;
    const dir = `dir=${get(filtersPayload, 'dir', '')}`;
    const page = `page=${get(filtersPayload, 'page', '')}`;
    const limit = `limit=${get(filtersPayload, 'limit', '')}`;

    return axios.get(`${API_URL!}/stores/${storeViewId}/products/search?${filters}&${withText}&${categoryId}&${order}&${dir}&${page}&${limit}`)
        .then((response: AxiosResponse) => response.data);
};