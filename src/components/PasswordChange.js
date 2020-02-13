import React, { Component } from 'react';

import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
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
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
            <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100 p-t-85 p-b-20">
                <form className="login100-form validate-form" onSubmit={this.onSubmit}>    
                  <div className="wrap-input100 validate-input m-t-85 m-b-35">
                  <span className="login100-form-title p-b-70">
                    ¿Deseas cambiar tu contraseña?
                  </span>
                  <input
                      value={passwordOne}
                      onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                      type="password"
                      placeholder="New Password"
                    />
                  </div>
                  <div className="wrap-input100 validate-input m-t-85 m-b-35">
                  <input
                      value={passwordTwo}
                      onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                      type="password"
                      placeholder="Confirm New Password"
                    />
                  </div>
                  <div className="container-login100-form-btn">
                    <button className="login100-form-btn" disabled={isInvalid} type="submit">
                      Cambiar Contraseña
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

export default PasswordChangeForm;