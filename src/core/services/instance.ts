import axios from 'axios';
import { decryptData } from '../cryptoToken';
import localStorageVariables from '../../utils/constants/localStorageVariables';
import urls from '../../utils/constants/urls';

const instance = (isFormData: boolean, isAuth: boolean) => {
    const axiosInstance = axios.create({
        baseURL: urls.baseApi,
        timeout: 10000,
        headers: {
            'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        },
    });

    if (!isAuth) return axiosInstance;

    axiosInstance.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `Bearer ${decryptData(localStorageVariables.token)}`;
            return config;
        },
        (error) => Promise.reject(error)
    );

    return axiosInstance;
};

export default instance;