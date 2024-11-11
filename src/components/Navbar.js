import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './css/Navbar.css';

const Navbar = () => {
    const { usuario, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">NG Deluxe</Link>
            </div>
            <div className="navbar-links">
                {usuario ? (
                    <>
                        <span>Hola, {usuario.nombre}</span>
                        {usuario.rol === 'admin' && <Link to="/admin">Admin</Link>}
                        <button onClick={logout}>Cerrar Sesión</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Iniciar Sesión</Link>
                        <Link to="/register">Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
