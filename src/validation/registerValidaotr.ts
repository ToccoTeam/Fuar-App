import * as yup from 'yup';

const validations = yup.object().shape({
    fullName: yup
        .string()
        .min(6, 'En az 6 karakter içermelidir.')
        .max(50, 'En fazla 50 karakter içerebilir.')
        .required('Zorunlu alan.'),
    pathName: yup
        .string()
        .min(6, 'En az 6 karakter içermelidir.')
        .max(50, 'En fazla 50 karakter içerebilir.')
        .required('Zorunlu alan.'),
    email: yup.string().email('Email formatında olmalıdır.').required('Zorunlu alan.'),
    password: yup
        .string()
        .min(6, 'En az 6 karakter içermelidir.')
        .max(50, 'En fazla 50 karakter içerebilir.')
        .required('Zorunlu alan.'),
});

export default validations;
