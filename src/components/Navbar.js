import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './css/Navbar.css';

const Navbar = () => {
    const { usuario } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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