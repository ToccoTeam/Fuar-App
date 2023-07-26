import { getRequest, postRequest } from "../core/services/request";
import LoginRequestModel from "../models/auth/LoginRequestModel";
import RegisterRequstModel from "../models/auth/RegisterRequstModel";
import UserInfoModel from "../models/users/UserInfoModel";

export const loginService = (data: LoginRequestModel) =>
    postRequest<LoginRequestModel, UserInfoModel>({
        url: '/users/Login',
        data,
        isAuth: false,
    });

export const getUserInfoService = () =>
    getRequest<UserInfoModel>({
        url: '/users/getuserinformation',
    });

export const registerService = (data: RegisterRequstModel) =>
    postRequest<RegisterRequstModel, UserInfoModel>({
        url: '/users/register',
        data,
        isAuth: false,
        isFormData: true,
    });