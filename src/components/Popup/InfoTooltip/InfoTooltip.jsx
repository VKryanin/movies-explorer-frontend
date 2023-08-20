import { Popup } from '../Popup';
import React, { useContext } from 'react';
import { ApiServiceContext } from '../../../contexts/ApiServiceContext';

export function InfoTooltip({ isOpen, name, onClosed }) {
    const { isError, errorText, successText } = useContext(ApiServiceContext);

    return (
        <Popup
            isOpen={isOpen}
            name={name}
            onClose={onClosed}
        >
            <div className='popup__tooltip'>
                <h2>{isError ? 'Ошибка' : 'Успешно'}</h2>
                <p>{isError ? errorText : successText}</p>
            </div>
        </Popup>
    );
};
