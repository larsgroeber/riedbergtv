import * as React from 'react';

import './Loader.css';

interface Props {
  loading: boolean;
}

export class Loader extends React.Component<Props> {
  render() {
    return (
      <div className={this.props.loading ? 'loader-loading' : ''}>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
