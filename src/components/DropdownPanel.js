// DropdownPanel.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/DropdownPanel.css';

const DropdownPanel = ({ categories, brands, onClose }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState([]); // Para múltiples expansiones en móvil

    // Detectar tamaño de pantalla para determinar si es móvil
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        handleResize(); // Establecer el estado inicial
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Manejar clic en categoría
    const handleCategoryClick = (categoryId) => {
        if (isMobile) {
            setExpandedCategories(prev => 
                prev.includes(categoryId) 
                    ? prev.filter(id => id !== categoryId) 
                    : [...prev, categoryId]
            );
        } else {
            setSelectedCategoryId(categoryId);
        }
    };

    // Filtrar marcas según la categoría seleccionada
    const selectedCategoryBrands = selectedCategoryId
        ? brands.filter(brand => brand.categoria._id === selectedCategoryId)
        : [];

    return (
        <div className="dropdown-panel">
            <div className="dropdown-overlay" onClick={onClose}></div>
            <div className="dropdown-content">
                <button className="close-button" onClick={onClose}>Cerrar</button>
                <div className="dropdown-inner-content">
                    <div className="categories-list">
                        {categories.map(category => (
                            <div key={category._id}>
                                <div
                                    className={`category-item ${(!isMobile && category._id === selectedCategoryId) ? 'active' : ''}`}
                                    onClick={() => handleCategoryClick(category._id)}
                                >
                                    {category.nombre}
                                </div>
                                {isMobile && expandedCategories.includes(category._id) && (
                                    <div className="brands-list-mobile">
                                        {brands
                                            .filter(brand => brand.categoria._id === category._id)
                                            .map(brand => (
                                                <div key={brand._id} className="brand-item-mobile">
                                                    <Link to={`/brands/${brand._id}`} onClick={onClose}>
                                                        <img src={brand.fotoUrl} alt={brand.nombre} />
                                                        <span>{brand.nombre}</span>
                                                    </Link>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {!isMobile && (
                        <div className="brands-grid-dropdown">
                            {selectedCategoryBrands.map(brand => (
                                <div key={brand._id} className="brand-item-dropdown">
                                    <Link to={`/brands/${brand._id}`} onClick={onClose}>
                                        <img src={brand.fotoUrl} alt={brand.nombre} />
                                        <span>{brand.nombre}</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DropdownPanel;