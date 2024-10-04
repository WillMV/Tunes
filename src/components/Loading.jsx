import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <svg>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop id="stop1" offset="0%" />
              <stop id="stop2" offset="100%" />

            </linearGradient>
          </defs>
          <circle cx="70" cy="70" r="70" />
        </svg>
      </div>
    );
  }
}
