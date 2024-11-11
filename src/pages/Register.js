import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import './css/Register.css';

const Register = () => {
    const { register } = useContext(AuthContext);
    const history = useHistory();

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(nombre, email, contraseña);
        if (success) {
            history.push('/');
        } else {
            setError('Error al registrar. Verifica tus datos.');
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Registrarse</h2>
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
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                />
                <button type="submit">Crear Cuenta</button>
            </form>
        </div>
    );
};

export default Register;
