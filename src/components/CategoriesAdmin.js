import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './../pages/css/Admin.css';

const CategoriesAdmin = () => {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState('');
    const [fotoUrl, setFotoUrl] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [error, setError] = useState('');

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategorias(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingCategory) {
            try {
                await api.put(`/categories/${editingCategory._id}`, { nombre, fotoUrl });
                setEditingCategory(null);
                setNombre('');
                setFotoUrl('');
                fetchCategories();
            } catch (error) {
                console.error(error);
                setError('Error al actualizar la categoría.');
            }
        } else {
            try {
                await api.post('/categories', { nombre, fotoUrl });
                setNombre('');
                setFotoUrl('');
                fetchCategories();
            } catch (error) {
                console.error(error);
                setError('Error al crear la categoría.');
            }
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setNombre(category.nombre);
        setFotoUrl(category.fotoUrl);
        setError('');
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
            try {
                await api.delete(`/categories/${id}`);
                fetchCategories();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCancel = () => {
        setEditingCategory(null);
        setNombre('');
        setFotoUrl('');
        setError('');
    };

    return (
        <div className="admin-section">
            <h3 className='titulo-panel'>Categorías</h3>
            <form onSubmit={handleSubmit} className="admin-form">
                <h4>{editingCategory ? 'Editar Categoría' : 'Crear Categoría'}</h4>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Nombre de la Categoría"
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
                <button type="submit">{editingCategory ? 'Actualizar' : 'Crear'}</button>
                {editingCategory && <button type="button" onClick={handleCancel}>Cancelar</button>}
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Foto URL</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map(cat => (
                        <tr key={cat._id}>
                            <td>{cat.nombre}</td>
                            <td><a href={cat.fotoUrl} target="_blank" rel="noopener noreferrer">Ver Imagen</a></td>
                            <td>
                                <button onClick={() => handleEdit(cat)}>Editar</button>
                                <button onClick={() => handleDelete(cat._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoriesAdmin;