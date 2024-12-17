import React from 'react';
import { Link } from 'react-router-dom';
import './css/Brand.css';

const Brand = ({ brand, onClick }) => { // Aceptar la prop onClick
    return (
        <Link 
            to={`/brands/${brand._id}`} 
            onClick={() => {
                console.log(`Marca clickeada: ${brand.nombre}`);
                onClick(); // Llamar a la función para guardar la posición del scroll
            }} 
            className="brand-card" // Usar 'brand-card' para aplicar estilos
        >
            <img 
                src={brand.fotoUrl} 
                alt={brand.nombre} 
                className="brand-image" 
            />
            <span className="brand-name">{brand.nombre}</span> {/* Usar 'brand-name' */}
        </Link>
    );
};

export default Brand;