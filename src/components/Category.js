import React from 'react';
import Brand from './Brand.js';
import './css/Category.css';

const Category = ({ category, brands }) => {
    return (
        <div className="category-section">
            <h2>{category.nombre}</h2>
            <div className="brands-grid">
                {brands.map((brand) => (
                    <Brand key={brand._id} brand={brand} />
                ))}
            </div>
        </div>
    );
};

export default Category;
