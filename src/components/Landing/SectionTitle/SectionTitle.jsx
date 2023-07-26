import React from 'react';
import "./SectionTitle.css"

export function SectionTitle({ children }) {
    return (
        <h2 className='section__title'>{children}</h2>
    )
}