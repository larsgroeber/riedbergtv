import * as React from 'react';

import './Loader.css';

interface Props {
  loading: boolean;
}

export class Loader extends React.Component<Props> {
  render() {
    const c = this.props.loading ? '' : this.props.children;
    return (
      <div className={this.props.loading ? 'loader-loading' : ''}>
        <div>{c}</div>
      </div>
    );
  }
}
