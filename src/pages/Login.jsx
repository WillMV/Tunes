import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    inputName: '',
    disable: true,
    loading: false,
  };

  buttonEnable = () => {
    const { inputName } = this.state;
    const MIN_NAME_LENGTH = 3;
    this.setState({
      disable: inputName.length < MIN_NAME_LENGTH,
    });
  };

  creatUser = async (event) => {
    const { inputName } = this.state;
    event.preventDefault();
    await this.onChangeValue('loading', true);
    await createUser({ name: inputName });
    await this.onChangeValue('loading', false);
  };

  onChangeValue = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.buttonEnable);
  };

  render() {
    const { inputName, disable, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form action="">
          { loading && <Loading />}
          <input
            type="text"
            name="inputName"
            value={ inputName }
            onChange={ this.onChangeValue }
            data-testid="login-name-input"
          />
          <button
            type="submit"
            onClick={ this.creatUser }
            disabled={ disable }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
