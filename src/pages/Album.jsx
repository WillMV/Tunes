import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import {
  getFavoriteSongs,
  addSong,
  removeSong,
} from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    album: [],
    artistName: '',
    albumName: '',
    albumImg: '',
    favList: [],
    isLoading: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const fetch = await getMusics(id);
    const favsMusics = await getFavoriteSongs();
    const musics = fetch.map((music) => {
      const check = favsMusics.some((fav) => fav.trackId === music.trackId);
      return ({ ...music, checked: check });
    });
    this.setState({
      album: musics,
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName,
      albumImg: musics[0].artworkUrl100,
      favList: favsMusics,
    });
  }

  controlCheck = async () => {
    const { album } = this.state;
    const favsMusics = await getFavoriteSongs();
    const musics = album.map((music) => {
      const check = favsMusics.some((fav) => fav.trackId === music.trackId);
      return ({ ...music, checked: check });
    });
    console.log(album, favsMusics);
    this.setState({ album: musics, favList: favsMusics }, console.log(album, favsMusics));
  };

  getMusic = (name) => {
    const { album } = this.state;
    return album.find((music) => music.trackId === +name);
  };

  controlFavTrack = async ({ target }) => {
    const { favList } = this.state;
    const inFavList = favList
      .some((favItem) => favItem.trackId === parseInt(target.name, 10));

    if (inFavList) {
      await this.removeFavTrack(target);
    } else {
      await this.addFavTrack(target);
    }
  };

  addFavTrack = async ({ name }) => {
    const music = this.getMusic(name);
    this.setState({ isLoading: true });
    console.log(music);
    await addSong(music);
    await this.controlCheck();
    this.setState({ isLoading: false });
  };

  removeFavTrack = async ({ name }) => {
    const music = this.getMusic(name);
    this.setState({ isLoading: true });
    await removeSong(music);
    await this.controlCheck();
    this.setState({ isLoading: false });
  };

  render() {
    const { artistName, albumName, albumImg, album, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading && <Loading />}
        <h1 data-testid="artist-name">
          {artistName}
        </h1>

        <br />
        <h2 data-testid="album-name">{albumName}</h2>
        <img src={ albumImg } alt={ `Capa do album ${albumName}` } />
        {
          album.map((music, index) => index > 0
          && (
            <MusicCard
              key={ music.trackId }
              controlFav={ this.controlFavTrack }
              music={ music }
            />))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
