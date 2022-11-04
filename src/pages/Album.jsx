import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    album: [],
    artistName: '',
    // artistlink: '',
    albumName: '',
    albumImg: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      album: musics,
      artistName: musics[0].artistName,
      // artistlink: musics[0].artistiViewUrl,
      albumName: musics[0].collectionName,
      albumImg: musics[0].artworkUrl100,
    });
  }

  render() {
    const { artistName, albumName, albumImg, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">
          {artistName}
        </h1>

        <br />
        <h2 data-testid="album-name">{albumName}</h2>
        <img src={ albumImg } alt={ `Capa do album ${albumName}` } />
        {
          album.map((music, index) => index > 0
          && <MusicCard music={ music } />)
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
