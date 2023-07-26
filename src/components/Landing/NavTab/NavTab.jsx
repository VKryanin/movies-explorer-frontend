import React from 'react';
import './NavTab.css';
import { Link } from 'react-scroll';

export function NavTab() {
    return (
        <nav className='nav-tab'>
            <ul className='nav-tab__links'>
                <li>
                    <Link
                        className='nav-tab__link'
                        to='about'
                        smooth={true}
                        duration={500}
                    >
                        <span>Узнать больше</span> 
                    </Link>
                </li>

            </ul>
        </nav>
    );
};

export default NavTab;
