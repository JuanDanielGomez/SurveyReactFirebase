import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';

const PasswordForgetPage = () =>
  <div>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100 p-t-85 p-b-20">
                <form className="login100-form validate-form" onSubmit={this.onSubmit}>    
                  <div className="wrap-input100 validate-input m-t-85 m-b-35">
                  <span className="login100-form-title p-b-70">
                    ¿Olvidaste tu contraseña?
                  </span>
                  <input
                      value={this.state.email}
                      onChange={event => this.setState(byPropKey('email', event.target.value))}
                      type="text"
                      placeholder="Email Address"
                  />
                  </div>
                  <div className="container-login100-form-btn">
                    <button className="login100-form-btn" disabled={isInvalid} type="submit">
                      Reset
                    </button>
                  </div>
                  { error && <p>{error.message}</p> }
                </form>
              </div>
            </div>
          </div>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>¿Olvidaste tu contraseña?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};