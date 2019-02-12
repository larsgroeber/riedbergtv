import * as React from 'react';
import { Config } from 'src/config';

export class Contact extends React.Component {
  render() {
    return (
      <div>
        <a href={`mailto:${Config.supportEmail}`}>
          <button className="btn btn-dark">Schreibe uns</button>
        </a>
      </div>
    );
  }
}
