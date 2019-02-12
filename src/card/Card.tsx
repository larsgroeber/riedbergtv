import * as React from 'react';

interface Props {
  background?: string;
  title?: any;
  body?: any;
  picture?: any;
}

export class Card extends React.Component<Props> {
  render() {
    return (
      <div
        style={{
          borderRadius: '5px',
          background: this.props.background ? this.props.background : 'white',
          padding: '0.2rem',
        }}
      >
        <div> {this.props.picture}</div>
        <div>{this.props.title}</div>
        <div>{this.props.body}</div>
      </div>
    );
  }
}
