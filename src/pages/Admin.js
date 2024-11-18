import React, { useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import UsersAdmin from '../components/UsersAdmin';
import CategoriesAdmin from '../components/CategoriesAdmin';
import BrandsAdmin from '../components/BrandsAdmin';
import ProductsAdmin from '../components/ProductsAdmin';
import './css/Admin.css';

const Admin = () => {
    const { path, url } = useRouteMatch();

    return (
        <div className="admin-container">
            <h2>Panel de Administración</h2>
            <div className="admin-links">
                <Link to={`${url}/users`}>Usuarios</Link>
                <Link to={`${url}/categories`}>Categorías</Link>
                <Link to={`${url}/brands`}>Marcas</Link>
                <Link to={`${url}/products`}>Productos</Link>
            </div>

            <Switch>
                <Route exact path={path}>
                    <h3 className='titulo-panel'>Selecciona una sección para administrar.</h3>
                </Route>
                <Route path={`${path}/users`} component={UsersAdmin} />
                <Route path={`${path}/categories`} component={CategoriesAdmin} />
                <Route path={`${path}/brands`} component={BrandsAdmin} />
                <Route path={`${path}/products`} component={ProductsAdmin} />
            </Switch>
        </div>
    );
};

export default Admin;
