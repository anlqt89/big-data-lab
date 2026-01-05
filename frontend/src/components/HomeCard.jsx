import { useState } from 'react';
import './homecard.css';

export const HomeCard = ({ title, tagline, description }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen); 
    };

    return (
        <div 
            /* If isOpen is true, it adds the 'active' class */
            className={`homecard ${isOpen ? 'active' : ''}`} 
            onClick={handleToggle}
        >
            <h3>{title}</h3>
            <span className="tagline">{tagline}</span>
            <p className="description">{description}</p>
        </div>
    );
}