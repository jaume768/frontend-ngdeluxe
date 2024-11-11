import React from 'react';
import './css/Brand.css';

const Brand = ({ brand }) => {
    return (
        <div className="brand-card">
            <img src={brand.fotoUrl} alt={brand.nombre} />
            <p>{brand.nombre}</p>
        </div>
    );
};

export default Brand;
