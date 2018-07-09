import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';

export class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <ClipLoader
          color={'#7AB8D8'}
          loading={this.state.loading}
        />
      </div>
    )
  }
}
