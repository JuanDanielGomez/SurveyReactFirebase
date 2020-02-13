import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import AuthUserContext from './AuthUserContext';

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const divStyle = {
  display:'inline',
  margin: '40px', 
};

const NavigationAuth = () =>
  
  <ul>
    <li style={divStyle}><Link to={routes.LANDING}>Survey</Link></li>
    <li style={divStyle}><Link to={routes.HOME}>Datos</Link></li>
    <li style={divStyle}><Link to={routes.ACCOUNT}>Cuenta</Link></li>
    <li style={divStyle}><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li style={divStyle}><Link to={routes.LANDING}>Survey</Link></li>
    <li style={divStyle}><Link to={routes.SIGN_IN}>Ingreso cantante</Link></li>
  </ul>

export default Navigation;