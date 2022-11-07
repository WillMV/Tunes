import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    isLoading: true,
    name: '',
    email: '',
    image: '',
    description: '',
    isDisabled: true,
    redirect: false,
  };

  async componentDidMount() {
    const fetch = await getUser();
    this.setState({
      name: fetch.name,
      email: fetch.email,
      image: fetch.image,
      description: fetch.description,
      isLoading: false,
    });
  }

  onChangeInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.isValidVerificator());
  };

  isValidVerificator = () => {
    const { name, email, image, description } = this.state;
    const validName = name.length > 0;
    const validEmail = email.includes('@');
    const validImage = image.length > 0;
    const validDesc = description.length > 0;
    const allValid = (validDesc && validEmail && validImage && validName);
    this.setState({
      isDisabled: !allValid,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const { name, email, image, description } = this.state;
    await updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState({ isLoading: false, redirect: true });
  };

  render() {
    const {
      isLoading,
      isDisabled,
      name,
      email,
      image,
      description,
      redirect,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading && <Loading /> }

        <form action="">
          <input
            data-testid="edit-input-name"
            type="text"
            name="name"
            value={ name }
            onChange={ this.onChangeInput }
          />
          <input
            data-testid="edit-input-email"
            type="text"
            name="email"
            value={ email }
            onChange={ this.onChangeInput }
          />
          <input
            data-testid="edit-input-description"
            type="text"
            name="description"
            value={ description }
            onChange={ this.onChangeInput }
          />
          <input
            data-testid="edit-input-image"
            type="text"
            name="image"
            value={ image }
            onChange={ this.onChangeInput }
          />
          <button
            data-testid="edit-button-save"
            type="submit"
            disabled={ isDisabled }
            onClick={ this.onSubmit }
          >
            Salvar
          </button>
          { redirect && <Redirect to="/profile" /> }
        </form>
      </div>
    );
  }
}
