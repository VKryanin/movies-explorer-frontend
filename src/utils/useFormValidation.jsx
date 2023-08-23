import { useState, useCallback } from 'react';

export const useFormAndValidation = (initialValues = {}, initialErrors = {}, initialValid = false) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);
    const [isValid, setValid] = useState(initialValid);
    const [isEmailValid, setEmailValid] = useState(false);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setValues({ ...values, [name]: value });
        if (name === 'email') {
            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(value)) {
                setErrors({ ...errors, [name]: 'Некорректный email' });
            } else {
                setErrors({ ...errors, [name]: '' });
            }
        } else if (name === 'password') {
            if (value.length < 6) {
                setErrors({ ...errors, [name]: 'Пароль должен содержать не менее 6 символов' });
            } else {
                setErrors({ ...errors, [name]: '' });
            }
        } else if (name === 'name') {
            if (value.length < 2 || value.length > 30) {
                setErrors({ ...errors, [name]: 'Имя должно содержать от 2 до 30 символов' });
            } else {
                setErrors({ ...errors, [name]: '' });
            }
        }
        console.log(evt.target.closest('form').checkValidity());
        setValid(evt.target.closest('form').checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setValid(newIsValid);
        },
        [setValues, setErrors, setValid]
    );

    return { values, errors, isValid, handleChange, resetForm, setValues, setValid };
};