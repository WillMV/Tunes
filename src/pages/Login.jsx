import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser, getUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    inputName: '',
    disable: true,
    loading: false,
    redirect: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    getUser().then((value) => {
      this.setState({ loading: false });
      if (Object.keys(value).length > 0) {
        this.setState({ redirect: true });
      }
    });
  }

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
      <span data-testid="page-login">
        { loading && <Loading />}
        <form className="card" action="">
          <h1>Login</h1>
          <label htmlFor={ inputName }>

            <input
              type="text"
              name="inputName"
              placeholder="Name"
              value={ inputName }
              onChange={ this.onChangeValue }
              data-testid="login-name-input"
            />
          </label>
          <br />
          <button
            type="submit"
            onClick={ this.creatingUser }
            disabled={ disable }
            data-testid="login-submit-button"
          >
            Confirm
          </button>
          { redirect && <Redirect to="/search" />}
        </form>
      </span>
    );
  }
}
