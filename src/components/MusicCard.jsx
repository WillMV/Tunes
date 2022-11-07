import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    isLoadin: false,
    isFav: false,
    favList: [],
  };

  async componentDidMount() {
    const { music: { trackId } } = this.props;
    this.setState({ isLoadin: true });
    const fetch = await getFavoriteSongs();
    const hadFav = fetch.some((musicFav) => musicFav.trackId === trackId);
    this.setState({ isLoadin: false, isFav: hadFav, favList: fetch });
  }

  controlFavTrack = async (event) => {
    const { favList } = this.state;
    const { music } = this.props;
    const inFavList = favList
      .some((favItem) => favItem.trackId === music.trackId);

    if (inFavList) {
      await this.removeFavTrack(event);
    } else {
      await this.addFavTrack(event);
    }
    const newFavs = await getFavoriteSongs();
    this.setState({ favList: newFavs });
  };

  removeFavTrack = async ({ target: { checked } }) => {
    const { music } = this.props;
    this.setState({ isLoadin: true, isFav: checked });
    await removeSong(music);
    this.setState({ isLoadin: false });
  };

  addFavTrack = async ({ target: { checked } }) => {
    const { music } = this.props;
    this.setState({ isLoadin: true, isFav: checked });
    await addSong(music);
    this.setState({ isLoadin: false });
  };

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { isLoadin, isFav } = this.state;
    return (
      <div>
        <h2>{ trackName }</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label text="Favorita" htmlFor={ trackId }>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ isFav }
            onChange={ this.controlFavTrack }
            id={ trackId }
          />
          Favorita
        </label>
        {isLoadin && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};
