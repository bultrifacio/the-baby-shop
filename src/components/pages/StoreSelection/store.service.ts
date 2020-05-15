import axios, {AxiosResponse} from 'axios';
import {Store} from "../../../shared/model/Store";

const API_URL = process.env.REACT_APP_PUBLIC_API_URL;

export const getStores = (): Promise<Array<Store>> => {
    return axios.get(`${API_URL!}/stores`).then((response: AxiosResponse) => response.data);
};