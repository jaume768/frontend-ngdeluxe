import React from 'react';
import './css/CategoriesFooter.css';

const CategoriesFooter = ({ onToggle }) => {
    return (
        <div className="categories-footer">
            <button className="categories-button" onClick={onToggle}>
                Categorías
            </button>
        </div>
    );
};

export default CategoriesFooter;