import React, { Component } from 'react';
import { Link,  withRouter, } from 'react-router-dom';
import { auth, db } from '../firebase';
import { SignInLink } from './SignIn';


import * as routes from '../constants/routes';

const SignUpPage = ({ history }) =>
  <div>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      // eslint-disable-next-line
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;
    //const history = this.props.history; Es lo mismo que lo de arriba

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        db.doCreateUser(authUser.user.uid, username, email)
        .then(() => {
          
          this.setState({ ...INITIAL_STATE });
          history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });

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
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    
    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';
    
    return (
            <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100 p-t-85 p-b-20">
                <form className="login100-form validate-form" onSubmit={this.onSubmit}>    
                  <div className="wrap-input100 validate-input m-t-85 m-b-35">
                  <span className="login100-form-title p-b-70">
                    Regístrate
                  </span>
                  <input
                    value={username}
                    onChange={event => this.setState(byPropKey('username', event.target.value))}
                    type="text"
                    placeholder="Nombre Completo"
                  />
                  </div>

                  <div className="wrap-input100 validate-input m-t-85 m-b-35" data-validate = "Enter username">
                  <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Dirección de correo"
                  />
                  </div>

                  <div className="wrap-input100 validate-input m-t-85 m-b-35" data-validate = "Enter username">
                  <input
                    value={passwordOne}
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                    type="password"
                    placeholder="Contraseña"
                  />
                  </div>

                  <div className="wrap-input100 validate-input m-t-85 m-b-35" data-validate = "Enter username">
                  <input
                    value={passwordTwo}
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirme Contraseña"
                  />
                  </div>

                  <div className="container-login100-form-btn">
                    <button disabled={isInvalid} type="submit" className="login100-form-btn">
                        Sign Up
                    </button>
                  </div>                 
                  { error && <p>{error.message}</p> }
                </form>
                <SignInLink />
              </div>
            </div>
          </div>
    );
  }
}

const SignUpLink = () =>
  <p>
    ¿No tienes una cuenta? 
    {' '}
    <Link to={routes.SIGN_UP}>¡Regístrate!</Link>
  </p>

export default withRouter(SignUpPage);
export {
  SignUpForm,
  SignUpLink,
};