import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    isLoading: true,
    favs: [],
  };

  async componentDidMount() {
    const getFavs = await getFavoriteSongs();
    this.setState({ favs: getFavs, isLoading: false });
  }

  // shouldComponentUpdate(nextP, nextS) {
  //   const { favs } = this.state;
  //   console.log('Atual');
  //   console.log(this.props, this.state);
  //   console.log('Proximo');
  //   console.log(nextP, nextS);
  //   const isfirst = favs.length === nextS.favs.length;
  //   console.log(isfirst);
  //   return true;
  // }

  async componentDidUpdate() {
    const { favs } = this.state;
    console.log('didup');
    const getfavs = await getFavoriteSongs();
    if (favs.length !== getfavs.length) {
      console.log('updidi');
      this.setState({ favs: getfavs });
    }
  }

  renderFavs = () => {
    const { favs } = this.state;
    return (
      favs.map((music) => <MusicCard key={ music.trackId } music={ music } />)
    );
  };

  render() {
    const { isLoading, favs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading && <Loading />}
        {favs.length > 0
        && this.renderFavs()}
      </div>
    );
  }
}
