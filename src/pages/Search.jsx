import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    search: '',
    artist: '',
    isSearch: false,
    searching: false,
    disable: true,
    albuns: [],
    isFind: false,
  };

  searchAlbum = async () => {
    const { search } = this.state;
    this.setState({
      searching: true,
      isSearch: true,
      artist: search,
    });
    const fetch = await searchAlbumsAPI(search);
    const isFinded = fetch.length < 1;
    this.setState({
      albuns: fetch,
      search: '',
      searching: false,
      isFind: isFinded,
    });
  };

  buttonEnable = () => {
    const { search } = this.state;
    const MIN_NAME_LENGTH = 2;
    this.setState({
      disable: search.length < MIN_NAME_LENGTH,
    });
  };

  // stateTrader = (name, value) => {
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  onChangeValue = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.buttonEnable);
  };

  render() {
    const { disable, searching, isSearch, isFind, artist, albuns } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {
          searching
            ? <Loading />
            : (
              <form action="">
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
                  Search
                </button>
              </form>)
        }
        {
          isFind ? (
            <div>
              Nothing...
            </div>
          ) : (isSearch && (
            <p>{`Resultado de álbuns de: ${artist}`}</p>
          ))
        }
        {
          albuns.map((album) => <AlbumCard key={ album.collectionID } album={ album } />)
        }
      </div>
    );
  }
}
