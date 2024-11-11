import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './../pages/css/Admin.css';

const ProductsAdmin = () => {
    const [productos, setProductos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [nombre, setNombre] = useState('');
    const [imagenes, setImagenes] = useState('');
    const [marca, setMarca] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [error, setError] = useState('');

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProductos(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchBrands = async () => {
        try {
            const res = await api.get('/brands');
            setMarcas(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchBrands();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imagenesArray = imagenes.split(',').map(img => img.trim());
        if (editingProduct) {
            // Actualizar producto
            try {
                await api.put(`/products/${editingProduct._id}`, { nombre, imagenes: imagenesArray, marca });
                setEditingProduct(null);
                setNombre('');
                setImagenes('');
                setMarca('');
                fetchProducts();
            } catch (error) {
                console.error(error);
                setError('Error al actualizar el producto.');
            }
        } else {
            // Crear nuevo producto
            try {
                await api.post('/products', { nombre, imagenes: imagenesArray, marca });
                setNombre('');
                setImagenes('');
                setMarca('');
                fetchProducts();
            } catch (error) {
                console.error(error);
                setError('Error al crear el producto.');
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setNombre(product.nombre);
        setImagenes(product.imagenes.join(', '));
        setMarca(product.marca);
        setError('');
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCancel = () => {
        setEditingProduct(null);
        setNombre('');
        setImagenes('');
        setMarca('');
        setError('');
    };

    return (
        <div className="admin-section">
            <h3>Productos</h3>
            <form onSubmit={handleSubmit} className="admin-form">
                <h4>{editingProduct ? 'Editar Producto' : 'Crear Producto'}</h4>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Nombre del Producto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="URLs de Imágenes (separadas por comas)"
                    value={imagenes}
                    onChange={(e) => setImagenes(e.target.value)}
                    required
                />
                <select value={marca} onChange={(e) => setMarca(e.target.value)} required>
                    <option value="">Selecciona una Marca</option>
                    {marcas.map(br => (
                        <option key={br._id} value={br._id}>{br.nombre}</option>
                    ))}
                </select>
                <button type="submit">{editingProduct ? 'Actualizar' : 'Crear'}</button>
                {editingProduct && <button type="button" onClick={handleCancel}>Cancelar</button>}
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Imágenes</th>
                        <th>Marca</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(prod => (
                        <tr key={prod._id}>
                            <td>{prod.nombre}</td>
                            <td>
                                {prod.imagenes.map((img, index) => (
                                    <a key={index} href={img} target="_blank" rel="noopener noreferrer">Imagen {index + 1}</a>
                                ))}
                            </td>
                            <td>{prod.marca.nombre}</td>
                            <td>
                                <button onClick={() => handleEdit(prod)}>Editar</button>
                                <button onClick={() => handleDelete(prod._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsAdmin;