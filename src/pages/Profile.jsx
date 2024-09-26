import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, logout } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    isLoading: true,
    redirect: false,
    user: {},
  };

  async componentDidMount() {
    const fetch = await getUser();
    this.setState({ user: fetch, isLoading: false });
  }

  handlerLogout = () => {
    this.setState({ isLoading: true });
    logout().then((value) => {
      if (value === 'OK') { this.setState({ redirect: true }); }
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { isLoading, redirect, user: { name, image, email, description } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading && <Loading />}
        <Link to="/profile/edit">Edit profile</Link>
        <button type="button" onClick={ this.handlerLogout }>Logout</button>
        <img data-testid="profile-image" src={ image } alt="" />
        <p>{name}</p>
        <p>{email}</p>
        <p>{description}</p>
        {redirect && <Redirect to="/" />}
      </div>
    );
  }
}
