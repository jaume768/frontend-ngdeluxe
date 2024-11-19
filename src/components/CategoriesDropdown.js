import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './css/CategoriesDropdown.css';

const CategoriesDropdown = ({ categorias, marcas, isOpen, toggleDropdown }) => {
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                if (isOpen) toggleDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleDropdown]);

    return (
        <div className={`dropdown-container ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
            <div className="dropdown-content">
                <div className="categories-list">
                    <h3>Categorías</h3>
                    <ul>
                        {categorias.map(categoria => (
                            <li key={categoria._id}>
                                <Link to={`/categories/${categoria._id}`} onClick={toggleDropdown}>
                                    {categoria.nombre}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="brands-list">
                    <h3>Marcas</h3>
                    {categorias.map(categoria => (
                        <div key={categoria._id} className="brands-group">
                            <h4>{categoria.nombre}</h4>
                            <ul>
                                {marcas
                                    .filter(brand => brand.categoria._id === categoria._id)
                                    .sort((a, b) => a.order - b.order)
                                    .map(brand => (
                                        <li key={brand._id}>
                                            <Link to={`/brands/${brand._id}`} onClick={toggleDropdown}>
                                                {brand.nombre}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <button className="close-button" onClick={toggleDropdown}>×</button>
        </div>
    );
};

export default CategoriesDropdown;