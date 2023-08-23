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
                setEmailValid(false);
            } else {
                setErrors({ ...errors, [name]: '' });
                setEmailValid(true);
            }
        } else {
            setErrors({ ...errors, [name]: evt.target.validationMessage });
        }
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

