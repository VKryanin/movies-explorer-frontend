import React from 'react';
import './Portfolio.css';
import { projects } from '../../../utils/projects'
import { Link } from 'react-router-dom';

export function Portfolio() {
    return (
        <div className='portfolio'>
            <h4 className='portfolio__title'>Портфолио</h4>
            <ul className='portfolio__items'>
                {projects.map((item) => {
                    return (
                        <li key={item.title} className='portfolio__item' >
                            <Link className='portfolio__link' to={item.url} target='_blank' rel='noopener noreferrer' >
                                {item.title}
                                <span className='portfolio__icon'>&#8599;</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};