import React from 'react';
import { Link } from 'react-router-dom';
import './css/ProductList.css';

const ProductList = ({ products }) => {
    return (
        <div className="product-list">
            {products.map(product => (
                <Link to={`/product/${product._id}`} key={product._id} className="product-link">
                    <div className="product-item">
                        {product.imagenes.length > 0 && (
                            <img src={product.imagenes[0]} alt={product.nombre} className="product-image" />
                        )}
                        <span className="product-name">{product.nombre}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProductList;