/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
// import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    search: '',
    searching: false,
    disable: true,
  };

  searchAlbum = async () => {
    this.setState({
      search: '',
      searching: true,
    });
  };

  buttonEnable = () => {
    const { search } = this.state;
    const MIN_NAME_LENGTH = 2;
    this.setState({
      disable: search.length < MIN_NAME_LENGTH,
    });
  };

  onChangeValue = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.buttonEnable);
  };

  render() {
    const { disable, searching } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {
          searching
            ? <Loading />
            : <form action="">
              <input
                type="text"
                name="search"
                onChange={ this.onChangeValue }
                data-testid="search-artist-input"
              />
              <button
                type="submit"
                disabled={ disable }
                onClick={ this.searchAlbum }
                data-testid="search-artist-button"
              >
                Pesquisar
              </button>
            </form>
        }
      </div>
    );
  }
}
