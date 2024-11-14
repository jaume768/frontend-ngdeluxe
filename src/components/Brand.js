import React from 'react';
import { Link } from 'react-router-dom';
import './css/Brand.css';

const Brand = ({ brand }) => {
    return (
        <div className="brand-container">
            <Link to={`/brands/${brand._id}`} className="brand-link">
                <div className="brand-card">
                    <img src={brand.fotoUrl} alt={brand.nombre} className="brand-image" />
                    <h3 className="brand-name">{brand.nombre}</h3>
                </div>
            </Link>
        </div>
    );
};

export default Brand;