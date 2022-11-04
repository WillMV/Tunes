import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    inputName: '',
    disable: true,
    loading: false,
    redirect: false,
  };

  buttonEnable = () => {
    const { inputName } = this.state;
    const MIN_NAME_LENGTH = 3;
    this.setState({
      disable: inputName.length < MIN_NAME_LENGTH,
    });
  };

  creatingUser = async (event) => {
    const { inputName } = this.state;
    event.preventDefault();
    this.onChangeValue({ target: { name: 'loading', value: true } });
    await createUser({ name: inputName });
    this.setState({
      loading: false,
      inputName: '',
      redirect: true,
    });
  };

  onChangeValue = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.buttonEnable);
  };

  render() {
    const { inputName, disable, loading, redirect } = this.state;
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
            onClick={ this.creatingUser }
            disabled={ disable }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
          { redirect && <Redirect to="/search" />}
        </form>
      </div>
    );
  }
}
