import { Popup } from '../Popup';
import React, { useContext } from 'react';
import { ApiServiceContext } from '../../../contexts/ApiServiceContext';

export function InfoTooltip({ isOpened, name, onClosed }) {
    const { isError, errorText, successText } = useContext(ApiServiceContext);

    return (
        <Popup
            isOpen={isOpened}
            name={name}
            onClose={onClosed}
        >
            <div className='popup__tooltip-wrapper'>
                <h2>{isError ? 'Ошибка' : 'Успешно'}</h2>
                <p>{isError ? errorText : successText}</p>
            </div>
        </Popup>
    );
};
