import React, { useState, useRef, FC, ReactNode } from 'react';
import { Modal, Box, Typography, TextField, SxProps, Theme, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import validationSchema from '../../validation/recordValidator';
import { errorMessage, successMessage } from '../../core/toastify';
import CustomBackdrop from '../../components/CustomBackdrop';
import RecordModel from '../../models/RecordModel';
import QRCode from 'react-qr-code';
import html2canvas from "html2canvas";
import axios from 'axios';
import urls from '../../utils/constants/urls';
import { registerService } from '../../services/authService';

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

const initialValues: RecordModel = {
    phone: 0,
    email: '',
    name: '',
    surname: '',
};

interface NewRecordModalProps {
    children?: ReactNode;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewRecordModal: FC<NewRecordModalProps> = (props) => {
    const { open, setOpen } = props;

    const qrcodeRef = useRef(null);

    const [state, setState] = useState({
        loading: false,
        url: '',
        qrCodeUrl: '',
    });

    const getQrCode = async () => {
        if(qrcodeRef.current !== null){
            const canvas = await html2canvas(qrcodeRef.current, {
                onclone: (clone) => {
                    const element = clone.getElementById('qrcode');
                    if(element)
                        element.style.display = 'block';
                }
            });
            return canvas.toDataURL();
        }
    }

    const handleClose = () => setOpen(false);

    const handleFormSubmit = async (values: RecordModel) => {
        setState((c) => ({ ...c, loading: true }));
        
        const image = await getQrCode();
        try {
            const response = await registerService({
                email: values.email,
                fullName: `${values.name} ${values.surname}`,
                password: values.email.split("@")[0],
                pathName: values.email.split("@")[0],
                phoneNumber: values.phone.toString(),
            });

            if(!response.data.success)
                throw new Error();

            await axios({
                method: 'post',
                url: `${urls.whatsappApi}image?phone=9${values.phone}@c.us`,
                headers: { 
                    'Content-Type': 'application/json',
                },
                data : JSON.stringify({
                    image: image?.slice(22),
                }),
            })

            successMessage('Mesaj Gönderildi!');
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
                    Yeni Kayıt Oluştur
                </Typography>
                <div ref={qrcodeRef} id='qrcode' style={{ background: 'white', paddingLeft: '32px', display: 'none' }}>
                    <QRCode value={state.url} />
                </div>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({ values, errors, touched, handleBlur, handleChange }) => (
                        <Form style={{display: 'flex', flexDirection: "column", gap: "24px" }}>
                            <TextField
                                label='İsim'
                                color='success'
                                variant='outlined'
                                fullWidth
                                name='name'
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                            />
                            <TextField
                                label='Soyisim'
                                color='success'
                                variant='outlined'
                                fullWidth
                                name='surname'
                                error={!!touched.surname && !!errors.surname}
                                helperText={touched.surname && errors.surname}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.surname}
                            />
                            <TextField
                                label='Email'
                                color='success'
                                variant='outlined'
                                fullWidth
                                name='email'
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    setState(prev => ({...prev, url: urls.baseAppUrl + e.target.value.split("@")[0]}))
                                }}
                                value={values.email}
                            />
                            <TextField
                                label='Telefon'
                                color='success'
                                variant='outlined'
                                fullWidth
                                name='phone'
                                error={!!touched.phone && !!errors.phone}
                                helperText={touched.phone && errors.phone}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phone}
                            />

                            <Button variant='contained' color='success' size='large' type='submit'>
                                Gönder
                            </Button>
                        </Form>
                    )}
                </Formik>
                {state.loading && <CustomBackdrop />}
            </Box>
        </Modal>
    );
};

export default NewRecordModal;
