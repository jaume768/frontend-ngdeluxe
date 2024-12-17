import React from 'react';
import Brand from './Brand.js';
import './css/Category.css';

const Category = ({ category, brands, onBrandClick }) => { // Aceptar la prop onBrandClick
    return (
        <div className="category-section">
            <img 
                src={category.fotoUrl} 
                alt={category.nombre} 
                className="category-image" 
            />
            <div className="brands-grid">
                {brands.map((brand) => (
                    <Brand 
                        key={brand._id} 
                        brand={brand} 
                        onClick={onBrandClick} // Pasar la función al componente Brand
                    />
                ))}
            </div>
        </div>
    );
};

export default Category;