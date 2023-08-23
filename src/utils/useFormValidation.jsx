import { useState, useCallback } from 'react';

export const useFormAndValidation = (initialValues = {}, initialErrors = {}, initialValid = false) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);
    const [isValid, setValid] = useState(initialValid);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        setValid(target.closest('form').checkValidity());

        if (name === 'name') {
            if (target.validationMessage === 'Введите данные в указанном формате.') {
                setErrors({
                    ...errors,
                    name: 'Имя должно содержать только символы латиницы или кириллицы',
                });
            }
        }
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setValid(newIsValid);
        },
        [setValues, setErrors, setValid]
    );

    return { values, errors, isValid, handleChange, resetForm, setValues };
};