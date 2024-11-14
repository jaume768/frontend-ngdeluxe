import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import './css/BrandProducts.css';

const BrandProducts = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [brand, setBrand] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBrandAndProducts = async () => {
            try {
                const brandRes = await api.get(`/brands/${id}`);
                setBrand(brandRes.data);

                const productsRes = await api.get(`/products/brand/${id}`);
                setProducts(productsRes.data);
            } catch (err) {
                console.error('Error al obtener datos de la marca o productos:', err);
                setError('No se pudieron cargar los datos.');
            } finally {
                setLoading(false);
            }
        };

        fetchBrandAndProducts();
    }, [id]);

    if (loading) {
        return <div className="loading">Cargando...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="brand-products-container">
            {brand && (
                <div className="brand-header">
                    <h1 className="brand-header-name">{brand.nombre}</h1>
                </div>
            )}
            <div className="products-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <Link to={`/products/${product._id}`} key={product._id} className="product-link">
                            <div className="product-item">
                                {product.imagenes.length > 0 && (
                                    <img src={product.imagenes[0]} alt={product.nombre} className="product-image" />
                                )}
                                <span className="product-name">{product.nombre}</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No hay productos disponibles para esta marca.</p>
                )}
            </div>
        </div>
    );
};

export default BrandProducts;