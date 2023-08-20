import { Popup } from '../Popup';
import { useContext } from 'react';
import { ApiServiceContext } from '../../../contexts/ApiServiceContext';
import { Preloader } from '../../Preloader/Preloader';

export function PopupVideo({ isOpen, name, onClose, link = 'https://www.youtube.com/watch?v=PTvTLvkiAbI' }) {
    const { isLoading } = useContext(ApiServiceContext);

    const replaceLink = (link) => {
        if (link.includes('youtube')) {
            return link.replace('/watch?v=', '/embed/');
        } else if (link.includes('vimeo')) {
            return link.replace('vimeo.com/', 'player.vimeo.com/video/');
        }
        return link;
    };

    return (
        <Popup
            isOpen={isOpen}
            name={name}
            onClosed={onClose}
        >
            {isLoading && <Preloader />}
            {!isLoading && <iframe
                className='popup__iframe'
                src={replaceLink(link)}
                title={name}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
            />}
        </Popup>
    );
}