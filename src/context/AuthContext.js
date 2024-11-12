import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true); // Estado para manejar la carga

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token encontrado en localStorage:', token);
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log('Token decodificado:', decoded);
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    console.error('Token expirado');
                    localStorage.removeItem('token');
                    setUsuario(null);
                } else {
                    setUsuario({ id: decoded.id, rol: decoded.rol, nombre: decoded.nombre });
                }
            } catch (error) {
                console.error('Token inválido', error);
                localStorage.removeItem('token');
                setUsuario(null);
            }
        }
        setCargando(false);
    }, []);

    const login = async (email, contraseña) => {
        try {
            const res = await api.post('/users/login', { email, contraseña });
            localStorage.setItem('token', res.data.token);
            const decoded = jwtDecode(res.data.token);
            setUsuario({ id: decoded.id, rol: decoded.rol, nombre: decoded.nombre });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const register = async (nombre, email, contraseña) => {
        try {
            const res = await api.post('/users/register', { nombre, email, contraseña });
            localStorage.setItem('token', res.data.token);
            const decoded = jwtDecode(res.data.token);
            setUsuario({ id: decoded.id, rol: decoded.rol, nombre: decoded.nombre });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, register, logout, cargando }}>
            {children}
        </AuthContext.Provider>
    );
};