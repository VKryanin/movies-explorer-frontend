import './Popup.css';
import { useEffect } from "react";

export function Popup({ isOpened, name, onClosed, children }) {
    useEffect(() => {
        if (!isOpened) return;
        const closeByEsc = (evt) => {
            if (evt.key === 'Escape') {
                onClosed();
            }
        }

        document.addEventListener('keydown', closeByEsc)
        return () => document.removeEventListener('keydown', closeByEsc)
    }, [isOpened, onClosed])

    const handleOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            onClosed();
        }
    }

    return (
        <div
            className={`popup ${isOpened ? "popup_opened" : ""} popup_type_${name}`}
            onMouseDown={handleOverlay}
        >
            <div className='popup__content'>
                {children}
                <button
                    type="button"
                    name="button_form_close"
                    id="button_form-add_close"
                    className="popup__close-button"
                    aria-label="Закрыть"
                    onClick={onClosed}
                />
            </div>
        </div>
    );
};