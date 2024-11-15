import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './../pages/css/Admin.css';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash } from 'react-icons/fa';

const ProductsAdmin = () => {
    const [productos, setProductos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [nombre, setNombre] = useState('');
    const [imagenes, setImagenes] = useState(['']); // Inicializar con un campo de imagen
    const [marca, setMarca] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [error, setError] = useState('');

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProductos(res.data);
        } catch (error) {
            console.error(error);
            setError('Error al obtener los productos.');
            toast.error('Error al obtener los productos.');
        }
    };

    const fetchBrands = async () => {
        try {
            const res = await api.get('/brands');
            setMarcas(res.data);
        } catch (error) {
            console.error(error);
            setError('Error al obtener las marcas.');
            toast.error('Error al obtener las marcas.');
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchBrands();
    }, []);

    const isValidURL = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleImageChange = (index, value) => {
        const newImagenes = [...imagenes];
        newImagenes[index] = value;
        setImagenes(newImagenes);
    };

    const addImageField = () => {
        setImagenes([...imagenes, '']);
    };

    const removeImageField = (index) => {
        const newImagenes = [...imagenes];
        newImagenes.splice(index, 1);
        setImagenes(newImagenes);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imagenesArray = imagenes.map(img => img.trim()).filter(img => img !== '');

        if (imagenesArray.length === 0) {
            setError('Por favor, ingresa al menos una URL de imagen.');
            toast.error('Por favor, ingresa al menos una URL de imagen.');
            return;
        }

        const invalidURLs = imagenesArray.filter(img => !isValidURL(img));
        if (invalidURLs.length > 0) {
            setError('Algunas URLs de imágenes no son válidas.');
            toast.error('Algunas URLs de imágenes no son válidas.');
            return;
        }

        if (editingProduct) {
            try {
                await api.put(`/products/${editingProduct._id}`, { nombre, imagenes: imagenesArray, marca });
                setEditingProduct(null);
                setNombre('');
                setImagenes(['']);
                setMarca('');
                setError('');
                fetchProducts();
                toast.success('Producto actualizado exitosamente.');
            } catch (error) {
                console.error(error);
                setError('Error al actualizar el producto.');
                toast.error('Error al actualizar el producto.');
            }
        } else {
            try {
                await api.post('/products', { nombre, imagenes: imagenesArray, marca });
                setNombre('');
                setImagenes(['']);
                setMarca('');
                setError('');
                fetchProducts();
                toast.success('Producto creado exitosamente.');
            } catch (error) {
                console.error(error);
                setError('Error al crear el producto.');
                toast.error('Error al crear el producto.');
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setNombre(product.nombre);
        setImagenes(product.imagenes.length > 0 ? product.imagenes : ['']);
        setMarca(product.marca._id);
        setError('');
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
                toast.success('Producto eliminado exitosamente.');
            } catch (error) {
                console.error(error);
                setError('Error al eliminar el producto.');
                toast.error('Error al eliminar el producto.');
            }
        }
    };

    const handleCancel = () => {
        setEditingProduct(null);
        setNombre('');
        setImagenes(['']);
        setMarca('');
        setError('');
    };

    return (
        <div className="admin-section">
            <h3 className='titulo-panel'>Productos</h3>
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
                <div className="imagenes-inputs">
                    <label>URLs de Imágenes:</label>
                    {imagenes.map((img, index) => (
                        <div key={index} className="imagen-input">
                            <input
                                type="text"
                                placeholder={`Imagen ${index + 1}`}
                                value={img}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                                required={index === 0}
                                className={!isValidURL(img) && img !== '' ? 'invalid-input' : ''}
                            />
                            {imagenes.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeImageField(index)}
                                    className="remove-image-button"
                                    title="Eliminar Imagen"
                                    aria-label={`Eliminar Imagen ${index + 1}`}
                                >
                                    <FaTrash />
                                </button>
                            )}
                            {isValidURL(img) && (
                                <img src={img} alt={`Preview ${index + 1}`} className="image-preview" />
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addImageField}
                        className="add-image-button"
                        title="Agregar Imagen"
                        aria-label="Agregar Nueva Imagen"
                    >
                        <FaPlus /> Agregar Imagen
                    </button>
                </div>
                <select value={marca} onChange={(e) => setMarca(e.target.value)} required>
                    <option value="">Selecciona una Marca</option>
                    {marcas.map(br => (
                        <option key={br._id} value={br._id}>{br.nombre}</option>
                    ))}
                </select>
                <button type="submit" className="submit-button">{editingProduct ? 'Actualizar' : 'Crear'}</button>
                {editingProduct && <button type="button" onClick={handleCancel} className="cancel-button">Cancelar</button>}
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
                            <td className='urls-imagenes'>
                                {prod.imagenes.map((img, index) => (
                                    <a key={index} href={img} target="_blank" rel="noopener noreferrer">Imagen {index + 1}</a>
                                ))}
                            </td>
                            <td>{prod.marca.nombre}</td>
                            <td className='urls-imagenes'>
                                <button onClick={() => handleEdit(prod)} className="edit-button">Editar</button>
                                <button onClick={() => handleDelete(prod._id)} className="delete-button">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default ProductsAdmin;