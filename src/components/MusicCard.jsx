import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    isLoadin: false,
    isFav: false,
  };

  async componentDidMount() {
    const { music: { trackId } } = this.props;
    this.setState({ isLoadin: true });
    const fetch = await getFavoriteSongs();
    const hadFav = fetch.find((musicFav) => musicFav.trackId === trackId);
    this.setState({ isLoadin: false, isFav: hadFav });
  }

  saveFavTrack = async ({ target: { checked } }) => {
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
        <label htmlFor={ trackId }>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ isFav }
            onClick={ this.saveFavTrack }
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
