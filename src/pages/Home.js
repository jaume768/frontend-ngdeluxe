// Home.jsx

import React, { useEffect, useState, useLayoutEffect } from 'react';
import api from '../services/api';
import Category from '../components/Category';
import TiendaComponent from '../components/TiendaComponent';
import CategoriesFooter from '../components/CategoriesFooter';
import DropdownPanel from '../components/DropdownPanel';
import './css/Home.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false); // Estado para rastrear la carga de datos

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/categories');
                setCategorias(res.data);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        };

        const fetchBrands = async () => {
            try {
                const res = await api.get('/brands');
                setMarcas(res.data);
            } catch (error) {
                console.error('Error al obtener marcas:', error);
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchCategories(), fetchBrands()]);
            setDataLoaded(true); // Marcar los datos como cargados
        };

        fetchData();
    }, []);

    // Función para guardar la posición del scroll
    const saveHomeScrollPosition = () => {
        console.log('Guardando posición del scroll:', window.scrollY);
        sessionStorage.setItem('homeScroll', window.scrollY);
    };

    // Restaurar la posición del scroll después de que los datos se hayan cargado
    useLayoutEffect(() => {
        if (dataLoaded) {
            const savedScroll = sessionStorage.getItem('homeScroll');
            if (savedScroll !== null) {
                console.log('Restaurando scroll a:', savedScroll);
                window.scrollTo(0, parseInt(savedScroll, 10));
                sessionStorage.removeItem('homeScroll'); // Opcional: limpiar el almacenamiento
            }
        }
    }, [dataLoaded]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        pauseOnHover: true,
    };

    const images = [
        'https://xcimg.szwego.com/wsxcWeb/01fdb4dd/o_1i0ladm3775fsb31urc48q6s5c.jpg',
        'https://xcimg.szwego.com/wsxcWeb/01fdb4dd/o_1i0ladosm77l1m3g10al1vaf1dajk.jpg',
        'https://xcimg.szwego.com/wsxcWeb/01fdb4dd/o_1i0ladrsr1o0a1v221phs9h81gr4s.jpg',
        'https://xcimg.szwego.com/wsxcWeb/01fdb4dd/o_1i0ladv9a17171ted14fkolup8k12.jpg',
        'https://xcimg.szwego.com/wsxcWeb/01fdb4dd/o_1i0lae23e4g512t5vir2q51s2g18.jpg',
    ];

    return (
        <div className="home">
            <div className="home-background">
                <TiendaComponent />
            </div>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img 
                            src={image} 
                            alt={`Slide ${index + 1}`} 
                            className="carousel-image" 
                            loading="lazy" // Mejora la carga de imágenes
                        />
                    </div>
                ))}
            </Slider>
            {categorias
                .sort((a, b) => a.order - b.order)
                .map((categoria) => {
                    const marcasDeCategoria = marcas.filter(brand => brand.categoria._id === categoria._id);
                    return (
                        <Category
                            key={categoria._id}
                            category={categoria}
                            brands={marcasDeCategoria}
                            onBrandClick={saveHomeScrollPosition} // Pasar la función como prop
                        />
                    );
                })}
            <CategoriesFooter onToggle={() => setIsDropdownOpen(!isDropdownOpen)} />
            {isDropdownOpen && (
                <DropdownPanel 
                    categories={categorias}
                    brands={marcas}
                    onClose={() => setIsDropdownOpen(false)}
                />
            )}
        </div>
    );
};

export default Home;