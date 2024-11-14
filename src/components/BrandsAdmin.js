import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './../pages/css/Admin.css';

const BrandsAdmin = () => {
    const [marcas, setMarcas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState('');
    const [fotoUrl, setFotoUrl] = useState('');
    const [categoria, setCategoria] = useState('');
    const [editingBrand, setEditingBrand] = useState(null);
    const [error, setError] = useState('');

    const fetchBrands = async () => {
        try {
            const res = await api.get('/brands');
            setMarcas(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategorias(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBrands();
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingBrand) {
            try {
                await api.put(`/brands/${editingBrand._id}`, { nombre, fotoUrl, categoria });
                setEditingBrand(null);
                setNombre('');
                setFotoUrl('');
                setCategoria('');
                fetchBrands();
            } catch (error) {
                console.error(error);
                setError('Error al actualizar la marca.');
            }
        } else {
            try {
                await api.post('/brands', { nombre, fotoUrl, categoria });
                setNombre('');
                setFotoUrl('');
                setCategoria('');
                fetchBrands();
            } catch (error) {
                console.error(error);
                setError('Error al crear la marca.');
            }
        }
    };

    const handleEdit = (brand) => {
        setEditingBrand(brand);
        setNombre(brand.nombre);
        setFotoUrl(brand.fotoUrl);
        setCategoria(brand.categoria ? brand.categoria._id : '');
        setError('');
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta marca?')) {
            try {
                await api.delete(`/brands/${id}`);
                fetchBrands();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCancel = () => {
        setEditingBrand(null);
        setNombre('');
        setFotoUrl('');
        setCategoria('');
        setError('');
    };

    return (
        <div className="admin-section">
            <h3 className='titulo-panel'>Marcas</h3>
            <form onSubmit={handleSubmit} className="admin-form">
                <h4>{editingBrand ? 'Editar Marca' : 'Crear Marca'}</h4>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Nombre de la Marca"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="URL de la Foto"
                    value={fotoUrl}
                    onChange={(e) => setFotoUrl(e.target.value)}
                    required
                />
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                    <option value="">Selecciona una Categoría</option>
                    {categorias.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.nombre}</option>
                    ))}
                </select>
                <button type="submit">{editingBrand ? 'Actualizar' : 'Crear'}</button>
                {editingBrand && <button type="button" onClick={handleCancel}>Cancelar</button>}
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Foto URL</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {marcas.map(brand => (
                        <tr key={brand._id}>
                            <td>{brand.nombre}</td>
                            <td><a href={brand.fotoUrl} target="_blank" rel="noopener noreferrer">Ver Imagen</a></td>
                            <td>{brand.categoria?.nombre || 'Sin categoría'}</td>
                            <td>
                                <button onClick={() => handleEdit(brand)}>Editar</button>
                                <button onClick={() => handleDelete(brand._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BrandsAdmin;