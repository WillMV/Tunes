import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    isLoaded: false,
    userName: '',
  };

  componentDidMount() {
    this.catchName();
  }

  catchName = async () => {
    const user = await getUser();
    this.setState({
      userName: user.name,
      isLoaded: true,
    });
  };

  render() {
    const { isLoaded, userName } = this.state;
    return (
      <header data-testid="header-component">
        {
          isLoaded
            ? <h1 data-testid="header-user-name">{`Olá ${userName}`}</h1>
            : <Loading />
        }

        <Link data-testid="link-to-search" to="/search"> Search </Link>
        <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
        <Link data-testid="link-to-profile" to="/profile"> Profile </Link>

      </header>
    );
  }
}
