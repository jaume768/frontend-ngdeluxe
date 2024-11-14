// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import BrandProducts from './pages/BrandProducts';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/admin" component={Admin} adminOnly />
          <PrivateRoute path="/perfil" component={Profile} />
          <Route path="/brands/:id" component={BrandProducts} /> {/* Nueva ruta */}
          {/* Agrega más rutas según sea necesario */}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;