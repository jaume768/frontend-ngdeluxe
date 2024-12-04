import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaDownload, FaShareAlt } from 'react-icons/fa';
import api from '../services/api';
import './css/BrandProducts.css';

const BrandProducts = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [brand, setBrand] = useState(null);
    const [loading, setLoading] = useState(false); // Inicialmente false
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const lastNodeRef = useRef();

    // Reiniciar estado cuando cambia la marca
    useEffect(() => {
        setProducts([]);
        setPage(1);
        setHasMore(true);
    }, [id]);

    // Crear el observador una sola vez
    useEffect(() => {
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                console.log('Intersecting with last item, loading more...');
                setPage(prevPage => prevPage + 1);
            }
        });

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [hasMore, loading]);

    const lastProductElementRef = useCallback(node => {
        if (observer.current) {
            if (lastNodeRef.current) {
                observer.current.unobserve(lastNodeRef.current);
            }
            if (node) {
                observer.current.observe(node);
                lastNodeRef.current = node;
            }
        }
    }, []);

    // Obtener la información de la marca
    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const brandRes = await api.get(`/brands/${id}`);
                setBrand(brandRes.data);
            } catch (err) {
                console.error('Error al obtener datos de la marca:', err);
                setError('No se pudo cargar la marca.');
            }
        };

        fetchBrand();
    }, [id]);

    // Obtener los productos paginados
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                console.log(`Fetching products for page ${page}`);
                const res = await api.get(`/products/brand/${id}`, {
                    params: { page, limit: 10 },
                });
                const fetchedProducts = res.data.products;

                setProducts(prevProducts => [...prevProducts, ...fetchedProducts]);
                const totalPages = res.data.totalPages;
                console.log(`Total pages: ${totalPages}, Current page: ${page}`);
                setHasMore(page < totalPages);
            } catch (err) {
                console.error('Error al obtener productos:', err);
                setError('No se pudieron cargar los productos.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [id, page]);

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
                {products.map((product, index) => {
                    const isLastItem = index === products.length - 1;
                    return (
                        <div
                            key={product._id}
                            className="product-item-container"
                            ref={isLastItem ? lastProductElementRef : null}
                        >
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
                    );
                })}
            </div>
            {loading && (
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            )}

            {!hasMore && !loading && <div className="end-message">No hay más productos para mostrar.</div>}
        </div>
    );
};

export default BrandProducts;