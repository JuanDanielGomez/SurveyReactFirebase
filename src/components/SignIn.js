import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { PasswordForgetLink } from './PasswordForget';

const SignInPage = ({ history }) =>
  <div>
    <SignInForm history={history} />
  </div>



const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100 p-t-85 p-b-20">
                <form className="login100-form validate-form" onSubmit={this.onSubmit}>
                  <span className="login100-form-title p-b-70">
                    Bienvenido
                  </span>
                  <span className="login100-form-avatar">
                    <img src="images/avatar-01.jpg" alt="AVATAR"/>
                  </span>
                            
                  <div className="wrap-input100 validate-input m-t-85 m-b-35" data-validate = "Ingrese usuario">
                    <input className="input100" value={email} onChange={event => this.setState(byPropKey('email', event.target.value))} type="text"/>
                    <span className="focus-input100" data-placeholder="Correo"></span>
                  </div>

                  <div className="wrap-input100 validate-input m-b-50" data-validate="Enter password">
                    <input className="input100" value={password} onChange={event => this.setState(byPropKey('password', event.target.value))} type="password"/>
                    <span className="focus-input100" data-placeholder="Contraseña"></span>
                  </div>

                  <div className="container-login100-form-btn">
                    <button className="login100-form-btn" disabled={isInvalid} type="submit">
                      Inicia Sesion
                    </button>
                  </div>
                  <ul className="login-more p-t-190">
                    <li className="m-b-8">
                      <span className="txt1">
                        <PasswordForgetLink />
                      </span>
                        
                    </li>

                    <li>
                      <span className="txt1">
                        <SignUpLink />
                      </span>
                    </li>
                  </ul>
                  { error && <p>{error.message}</p> }
                </form>
              </div>
            </div>
          </div>
    );
  }
}

const SignInLink = () =>
  <p>
    ¿Ya tienes una cuenta? 
    {' '}
    <Link to={routes.SIGN_IN}>¡Inicia Sesión!</Link>
  </p>

export default withRouter(SignInPage);

export {
  SignInForm,
  SignInLink
};