import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    isLoadin: false,
  };

  saveFavTrack = async () => {
    const { music } = this.props;
    this.setState({
      isLoadin: true,
    });
    await addSong(music);
    this.setState({
      isLoadin: false,
    });
  };

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { isLoadin } = this.state;
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
    trackId: PropTypes.string,
  }).isRequired,
};
