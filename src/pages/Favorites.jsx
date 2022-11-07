import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    isLoading: true,
    songs: [],
  };

  async componentDidMount() {
    const favsMusics = await getFavoriteSongs();
    const musics = favsMusics.map((music) => ({ ...music, checked: true }));
    this.setState({ songs: musics, isLoading: false });
  }

  createList = async () => {
    const favsMusics = await getFavoriteSongs();
    const musics = favsMusics.map((music) => ({ ...music, checked: true }));
    this.setState({ songs: musics });
  };

  getMusic = (name) => {
    const { songs } = this.state;
    return songs.find((music) => music.trackId === +name);
  };

  removeSong = async ({ target: { name } }) => {
    const music = this.getMusic(name);
    this.setState({ isLoading: true });
    await removeSong(music);
    await this.createList();
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, songs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading && <Loading />}
        {songs.length > 0
        && (
          songs.map((music) => (<MusicCard
            key={ music.trackId }
            music={ music }
            controlFav={ this.removeSong }
          />))
        )}
      </div>
    );
  }
}
