import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validations = yup.object().shape({
    phone: yup
        .string()
        .min(11, '11 karakterli olmalıdır')
        .max(11, '11 karakterli olmalıdır')
        .matches(phoneRegExp, 'Telefon formatında olmalıdır')
        .required('Zorunlu alan.'),
    name: yup
        .string()
        .min(2, 'en az 2 karakter içermelidir')
        .max(20, 'en fazla 20 karakter içerebilir')
        .required('Zorunlu alan.'),
    surname: yup
        .string()
        .min(2, 'en az 2 karakter içermelidir')
        .max(20, 'en fazla 20 karakter içerebilir')
        .required('Zorunlu alan.'),
    email: yup
        .string()
        .email('email formatında olmalıdır')
        .required('Zorunlu alan.'),
});

export default validations;