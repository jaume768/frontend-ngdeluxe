import React from 'react';
import Brand from './Brand.js';
import './css/Category.css';

const Category = ({ category, brands }) => {
    return (
        <div className="category-section">
            <img 
                src={category.fotoUrl} 
                alt={category.nombre} 
                className="category-image" 
            />
            <div className="brands-grid">
                {brands.map((brand) => (
                    <Brand key={brand._id} brand={brand} />
                ))}
            </div>
        </div>
    );
};

export default Category;
