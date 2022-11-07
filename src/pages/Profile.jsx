import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    isLoading: true,
    user: {},
  };

  async componentDidMount() {
    const fetch = await getUser();
    console.log(fetch);
    console.log(fetch.name.length);
    this.setState({ user: fetch, isLoading: false });
  }

  render() {
    const { isLoading, user: { name, image, email, description } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoading
            ? <Loading />
            : (
              <div>
                <Link to="/profile/edit">Editar perfil</Link>
                <img data-testid="profile-image" src={ image } alt="" />
                <p>{`${name}`}</p>
                <p>{email}</p>
                <p>{description}</p>
              </div>
            )
        }

      </div>
    );
  }
}
