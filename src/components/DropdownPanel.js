import React from 'react';
import { Link } from 'react-router-dom';
import './css/DropdownPanel.css';

const DropdownPanel = ({ categories, brands, onClose }) => {
    return (
        <div className="dropdown-panel">
            <div className="dropdown-overlay" onClick={onClose}></div>
            <div className="dropdown-content">
                <button className="close-button" onClick={onClose}>Cerrar</button>
                <div className="dropdown-inner-content">
                    <div className="categories-list">
                        {categories.map(category => (
                            <div key={category._id} className="category-item">
                                {category.nombre}
                            </div>
                        ))}
                    </div>
                    <div className="categories-brands">
                        {categories.map(category => {
                            const categoryBrands = brands.filter(brand => brand.categoria._id === category._id);
                            return (
                                <div key={category._id} className="category-brands-section">
                                    <h3>{category.nombre}</h3>
                                    <ul>
                                        {categoryBrands.map(brand => (
                                            <li key={brand._id}>
                                                <Link to={`/brands/${brand._id}`} onClick={onClose}>
                                                    {brand.nombre}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropdownPanel;