import './Header.css';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className='header'>
      <div className='header__logo' onClick={
        () => navigate('/')
      } ></div>
      <Navigation />
    </header>
  );
};