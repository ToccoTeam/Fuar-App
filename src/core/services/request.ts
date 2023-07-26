import { AxiosResponse } from 'axios';
import instance from './instance';
import ResultModel from '../models/ResultModel';

interface RequestParams<TRequest> {
    url: string;
    isAuth?: boolean;
    data?: TRequest;
    isFormData?: boolean;
}

export const getRequest = <TResponse>({
    isAuth = true,
    isFormData = false,
    url,
}: RequestParams<null>) => {
    const newInstance = instance(isFormData, isAuth);

    return newInstance.get<TResponse, AxiosResponse<ResultModel<TResponse>>, null>(url);
};

export const postRequest = <TRequest, TResponse>({
    isAuth = true,
    isFormData = false,
    url,
    data,
}: RequestParams<TRequest>) => {
    const newInstance = instance(isFormData, isAuth);

    return newInstance.post<TResponse, AxiosResponse<ResultModel<TResponse>>, TRequest>(url, data);
};

export const putRequest = <TRequest, TResponse>({
    isAuth = true,
    isFormData = false,
    url,
    data,
}: RequestParams<TRequest>) => {
    const newInstance = instance(isFormData, isAuth);

    return newInstance.put<TResponse, AxiosResponse<ResultModel<TResponse>>, TRequest>(url, data);
};

export const deleteRequest = <TResponse>({
    isAuth = true,
    isFormData = false,
    url,
}: RequestParams<null>) => {
    const newInstance = instance(isFormData, isAuth);

    return newInstance.delete<TResponse, AxiosResponse<ResultModel<TResponse>>, null>(url);
};
