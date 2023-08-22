import './Popup.css';
import { useEffect } from "react";

export function Popup({ isOpen, name, onClose, children }) {

    useEffect(() => {
        if (!isOpen) return;
        const closeByEsc = (evt) => {
            if (evt.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', closeByEsc)
        return () => document.removeEventListener('keydown', closeByEsc)
    }, [isOpen, onClose])

    const handleOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            onClose();
        }
    }

    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`} onMouseDown={handleOverlay} >
            <div className='popup__content'>
                {children}
                <button className="popup__close-button" type="button" name="button_form_close" id="button_form-add_close" aria-label="Закрыть" onClick={onClose} />
            </div>
        </div>
    );
};