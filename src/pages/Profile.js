import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import './css/Profile.css';

const Profile = () => {
    const { usuario, logout } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/');
    };

    if (!usuario) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>Mi Perfil</h2>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Rol:</strong> {usuario.rol}</p>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </div>
    );
};

export default Profile;