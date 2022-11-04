import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AlbumCard extends Component {
  render() {
    const { album: { artistName,
      collectionName,
      artworkUrl100,
      collectionId,
    } } = this.props;
    return (
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <img src={ artworkUrl100 } alt="imgAlbum" />
        <h5>{ collectionName }</h5>
        <p>{ artistName }</p>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionId: PropTypes.string,
  }).isRequired,
};
