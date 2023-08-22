import './SearchMessage.css';

export const SearchMessage = ({ children }) => {
    return (
        <div className='movies__message-wrapper'>
            <h2 className='movies__message-text'>{children}</h2>
        </div>
    )
}
