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

        // Подставляю свой текст ошибки при валидации имени, чтобы пользователь
        // понимал что не так
        if (name === 'name') {
            if (target.validationMessage === 'Please match the requested format.') {
                setErrors({
                    ...errors,
                    name: 'Name must contain olny Latin or Cyrillic characters, spaces or symbol "-" and must not start with space',
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