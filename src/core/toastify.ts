import { Bounce, toast, ToastOptions } from 'react-toastify';

const option: ToastOptions = {
    autoClose: 2000,
    transition: Bounce,
    position: 'top-center',
    theme: 'light',
};

export const errorMessage = (message: string) => toast.error(message, option);

export const successMessage = (message: string) => toast.success(message, option);

export const warningMessage = (message: string) => toast.warn(message, option);

export const infoMessage = (message: string) => toast.info(message, option);