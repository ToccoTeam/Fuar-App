import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, SxProps, Theme, Button } from '@mui/material';
import LoginRequestModel from '../../models/auth/LoginRequestModel';
import { Formik, Form } from 'formik';
import validationSchema from '../../validation/loginValidator';
import { useAuth } from '../../context/AuthContext';
import { errorMessage, successMessage } from '../../core/toastify';
import { encryptData } from '../../core/cryptoToken';
import localStorageVariables from '../../utils/constants/localStorageVariables';
import { loginService } from '../../services/authService';
import CustomBackdrop from '../../components/CustomBackdrop';

const style: SxProps<Theme> = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#111',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
};

const initialValues: LoginRequestModel = {
    email: '',
    password: '',
};

interface LoginModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = (props: LoginModalProps) => {
    const { open, setOpen } = props;

    const [state, setState] = useState({
        loading: false,
    });

    const { setAuth } = useAuth();

    const handleClose = () => setOpen(false);

    const handleFormSubmit = async (values: LoginRequestModel) => {
        setState((c) => ({ ...c, loading: true }));

        try {
            const response = await loginService(values);

            setAuth((prev: any) => ({
                ...prev,
                isAuth: true,
                fullName: response.data.data?.fullName,
                email: response.data.data?.email,
                pathName: response.data.data?.pathName
            }));

            encryptData(localStorageVariables.token, response.data.data?.tokenModel.accessToken);

            successMessage('Sisteme giriş yapıldı!');
            handleClose();
        } catch (err) {
            errorMessage('Hatalı işlem');
        }

        setState((c) => ({ ...c, loading: false }));
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant='h2' component='h2' textAlign='center'>
                    Giriş Yap
                </Typography>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({ values, errors, touched, handleBlur, handleChange }) => (
                        <Form style={{display: 'flex', flexDirection: "column", gap: "24px" }}>
                            <TextField
                                label='Email'
                                color='success'
                                variant='outlined'
                                fullWidth
                                name='email'
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                            />
                            <TextField
                                label='Şifre'
                                color='success'
                                type='password'
                                variant='outlined'
                                fullWidth
                                name='password'
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                            />
                            <Button variant='contained' color='success' size='large' type='submit'>
                                Giriş
                            </Button>
                        </Form>
                    )}
                </Formik>
                {state.loading && <CustomBackdrop />}
            </Box>
        </Modal>
    );
};

export default LoginModal;
