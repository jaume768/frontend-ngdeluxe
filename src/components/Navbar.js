import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './css/Navbar.css';

const Navbar = () => {
    const { usuario, logout } = useContext(AuthContext);
    const history = useHistory();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        history.push('/');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">NG Deluxe</Link>
            </div>
            <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
                {usuario ? (
                    <>
                        <span className="greeting">Hola, {usuario.nombre}</span>
                        {usuario.rol === 'admin' && <Link to="/admin">Administración</Link>}
                        <Link to="/perfil">Perfil</Link>
                    </>
                ) : (
                    <Link to="/login" className="signin-button">Iniciar Sesión</Link>
                )}
            </div>
            <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
                <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></div>
            </div>
        </nav>
    );
};

export default Navbar;