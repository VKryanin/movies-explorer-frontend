import React from 'react';
import "./SectionTitle.css"

export function SectionTitle({ children }) {
    return (
        <h2 className='title'>{children}</h2>
    )
}