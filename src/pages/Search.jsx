import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    search: '',
    disable: true,
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
    const { disable } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <input
            type="text"
            name="search"
            onChange={ this.onChangeValue }
            data-testid="search-artist-input"
          />
          <button type="submit" disabled={ disable } data-testid="search-artist-button">
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
