// src/components/PrivateRoute.js

import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, adminOnly, ...rest }) => {
  const { usuario } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        usuario ? (
          adminOnly && usuario.rol !== 'admin' ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;