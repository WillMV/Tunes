import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MusicCard extends Component {
  render() {
    const {
      music: { trackName, previewUrl, trackId, checked },
      controlFav,
    } = this.props;
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
            name={ trackId }
            type="checkbox"
            checked={ checked }
            onChange={ controlFav }
            id={ trackId }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
    checked: PropTypes.bool,
  }).isRequired,
  controlFav: PropTypes.func.isRequired,
};
