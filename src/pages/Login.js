import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import './css/Login.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, contraseña);
        if (success) {
            history.push('/');
        } else {
            setError('Credenciales inválidas');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar Sesión</h2>
                {error && <p className="error">{error}</p>}
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
                <button type="submit">Entrar</button>
                <p className="toggle-auth">
                    <Link to="/register"> ¿No tienes cuenta? Regístrate</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;