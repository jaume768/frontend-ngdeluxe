import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import './css/ProductDescription.css';

const ProductDescription = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductAndRelated = async () => {
            try {
                const productRes = await api.get(`/products/${id}`);
                setProduct(productRes.data);

                const randomRes = await api.get(`/products/brand/${productRes.data.marca._id}/random/${id}`);
                setRelatedProducts(randomRes.data);
            } catch (err) {
                console.error('Error al obtener el producto o productos relacionados:', err);
                setError('No se pudo cargar la descripción del producto.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductAndRelated();
    }, [id]);

    if (loading) {
        return <div className="loading">Cargando...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!product) {
        return <div className="error-message">Producto no encontrado.</div>;
    }

    return (
        <div className="product-description-container">
            {product.imagenes.length > 0 && (
                <div className="product-carousel">
                    {product.imagenes.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${product.nombre} ${index + 1}`}
                            className="carousel-image-description"
                            loading="lazy"
                        />
                    ))}
                </div>
            )}
            <h1 className='nombre-producto'>{product.nombre}</h1>

            <h2 className="related-title">Productos Relacionados</h2>
            <div className="related-products-slider">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map(relProd => (
                        <Link to={`/products/${relProd._id}`} key={relProd._id} className="related-product-link">
                            <div className="related-product-item">
                                {relProd.imagenes.length > 0 && (
                                    <img src={relProd.imagenes[0]} alt={relProd.nombre} className="related-product-image" />
                                )}
                                <span className="related-product-name">{relProd.nombre}</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No hay productos relacionados disponibles.</p>
                )}
            </div>

            <h2 className="images-column-title">Galería de Imágenes</h2>
            <div className="images-column">
                {product.imagenes.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`${product.nombre} ${index + 1}`}
                        className="column-image"
                        loading="lazy"
                    />
                ))}
            </div>

            <h2 className="related-title">Más Productos de {product.marca.nombre}</h2>
            <div className="related-products-list">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map(relProd => (
                        <Link to={`/products/${relProd._id}`} key={relProd._id} className="related-product-link">
                            <div className="related-product-item">
                                {relProd.imagenes.length > 0 && (
                                    <img src={relProd.imagenes[0]} alt={relProd.nombre} className="related-product-image" />
                                )}
                                <span className="related-product-name">{relProd.nombre}</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No hay más productos disponibles.</p>
                )}
            </div>
        </div>
    );

};

export default ProductDescription;
