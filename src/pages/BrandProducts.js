import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaDownload, FaShareAlt } from 'react-icons/fa';
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

    const handleShare = (productId, event) => {
        event.preventDefault();
        event.stopPropagation();
        const productLink = `${window.location.origin}/products/${productId}`;
        const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(productLink)}`;
        window.open(whatsappURL, '_blank');
    };

    const handleDownload = async (imageUrl, productName, event) => {
        event.preventDefault();
        event.stopPropagation();
    
        try {
            const response = await fetch(imageUrl, {
                mode: 'cors',
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${productName}.jpg`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al descargar la imagen:', error);
            alert('No se pudo descargar la imagen. Inténtalo de nuevo más tarde.');
        }
    };

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
                    {brand.categoria && brand.categoria.fotoUrl && (
                        <img 
                            src={brand.categoria.fotoUrl} 
                            alt={`Categoría: ${brand.categoria.nombre}`} 
                            className="brand-header-image" 
                        />
                    )}
                    <h1 className="brand-header-name">{brand.nombre}</h1>
                </div>
            )}
            <div className="products-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="product-item-container">
                            <Link to={`/products/${product._id}`} className="product-link">
                                <div className="product-item">
                                    <img src={product.imagenes[0]} alt={product.nombre} className="product-image" />

                                    <div className="product-content">
                                        <span className="product-name">{product.nombre}</span>

                                        <div className="product-actions">
                                            <button
                                                className="download-button"
                                                onClick={(event) => handleDownload(product.imagenes[0], product.nombre, event)}
                                                aria-label="Descargar imagen"
                                            >
                                                <FaDownload />
                                            </button>
                                            <button
                                                className="share-button"
                                                onClick={(event) => handleShare(product._id, event)}
                                                aria-label="Compartir producto"
                                            >
                                                <FaShareAlt />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles para esta marca.</p>
                )}
            </div>
        </div>
    );
};

export default BrandProducts;