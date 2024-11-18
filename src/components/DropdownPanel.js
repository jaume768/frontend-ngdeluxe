// DropdownPanel.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/DropdownPanel.css';

const DropdownPanel = ({ categories, brands, onClose }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?._id); // Selecciona la primera categoría por defecto

    const handleCategoryClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };

    const selectedCategoryBrands = brands.filter(
        brand => brand.categoria._id === selectedCategoryId
    );

    return (
        <div className="dropdown-panel">
            <div className="dropdown-overlay" onClick={onClose}></div>
            <div className="dropdown-content">
                <button className="close-button" onClick={onClose}>Cerrar</button>
                <div className="dropdown-inner-content">
                    <div className="categories-list">
                        {categories.map(category => (
                            <div
                                key={category._id}
                                className={`category-item ${category._id === selectedCategoryId ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category._id)}
                            >
                                {category.nombre}
                            </div>
                        ))}
                    </div>
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
                </div>
            </div>
        </div>
    );
};

export default DropdownPanel;