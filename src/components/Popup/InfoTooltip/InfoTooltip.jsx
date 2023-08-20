import { Popup } from '../Popup';
import React, { useContext } from 'react';
import { ApiServiceContext } from '../../../contexts/ApiServiceContext';

export function InfoTooltip({ isOpen, name, onClose }) {
    const { isError, errorText, successText } = useContext(ApiServiceContext);

    return (
        <Popup
            isOpen={isOpen}
            name={name}
            onClose={onClose}
        >
            <div className='popup__tooltip-wrapper'>
                <h2>{isError ? 'Ошибка' : 'Успешно'}</h2>
                <p>{isError ? errorText : successText}</p>
            </div>
        </Popup>
    );
};
