import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Category from '../components/Category';
import './css/Home.css';

const Home = () => {
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/categories');
                setCategorias(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchBrands = async () => {
            try {
                const res = await api.get('/brands');
                setMarcas(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
        fetchBrands();
    }, []);

    return (
        <div className="home">
            <img src="/assets/main.jpeg" alt="Principal" className="main-image" />
            {categorias.map((categoria) => (
                <Category
                    key={categoria._id}
                    category={categoria}
                    brands={marcas.filter(brand => brand.categoria === categoria._id)}
                />
            ))}
        </div>
    );
};

export default Home;
