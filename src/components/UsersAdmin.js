import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './../pages/css/Admin.css';

const UsersAdmin = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rol, setRol] = useState('normal');
    const [editingUser, setEditingUser] = useState(null);
    const [error, setError] = useState('');

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            setUsuarios(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUser) {
            try {
                await api.put(`/users/${editingUser._id}`, { nombre, email, rol });
                setEditingUser(null);
                setNombre('');
                setEmail('');
                setRol('normal');
                fetchUsers();
            } catch (error) {
                console.error(error);
                setError('Error al actualizar el usuario.');
            }
        } else {
            // Crear nuevo usuario
            try {
                await api.post('/users/register', { nombre, email, contraseña });
                setNombre('');
                setEmail('');
                setContraseña('');
                setRol('normal');
                fetchUsers();
            } catch (error) {
                console.error(error);
                setError('Error al crear el usuario.');
            }
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setNombre(user.nombre);
        setEmail(user.email);
        setRol(user.rol);
        setError('');
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
            try {
                await api.delete(`/users/${id}`);
                fetchUsers();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCancel = () => {
        setEditingUser(null);
        setNombre('');
        setEmail('');
        setContraseña('');
        setRol('normal');
        setError('');
    };

    return (
        <div className="admin-section">
            <h3>Usuarios</h3>
            <form onSubmit={handleSubmit} className="admin-form">
                <h4>{editingUser ? 'Editar Usuario' : 'Crear Usuario'}</h4>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {!editingUser && (
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                )}
                <select value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="normal">Normal</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">{editingUser ? 'Actualizar' : 'Crear'}</button>
                {editingUser && <button type="button" onClick={handleCancel}>Cancelar</button>}
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(user => (
                        <tr key={user._id}>
                            <td>{user.nombre}</td>
                            <td>{user.email}</td>
                            <td>{user.rol}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Editar</button>
                                <button onClick={() => handleDelete(user._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersAdmin;