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
                console.log('Categorías:', res.data);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        };

        const fetchBrands = async () => {
            try {
                const res = await api.get('/brands');
                setMarcas(res.data);
                console.log('Marcas:', res.data);
            } catch (error) {
                console.error('Error al obtener marcas:', error);
            }
        };

        fetchCategories();
        fetchBrands();
    }, []);

    return (
        <div className="home">
            <img src="/assets/main.jpeg" alt="Principal" className="main-image" />
            {categorias.map((categoria) => {
                const marcasDeCategoria = marcas.filter(brand => brand.categoria._id === categoria._id);
                console.log(`Marcas para la categoría ${categoria.nombre}:`, marcasDeCategoria);
                return (
                    <Category
                        key={categoria._id}
                        category={categoria}
                        brands={marcasDeCategoria}
                    />
                );
            })}
        </div>
    );
};

export default Home;