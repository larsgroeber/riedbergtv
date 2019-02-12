import * as React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import './Footer.css';

export class Footer extends React.Component {
  render() {
    return (
      <footer>
        RiedbergTV {moment().year()}
        <p>
          <Link to="/pages/datenschutz">Datenschutz</Link> |{' '}
          <Link to="/pages/impressum">Impressum</Link> | Powered by{' '}
          <a
            href="https://physikonline.uni-frankfurt.de"
            target="_blank"
            rel="noopener"
          >
            PhysikOnline
          </a>{' '}
          | Build with <i id="heart" className="fas fa-heart" /> by{' '}
          <a href="https://larsgroeber.com" target="_blank" rel="noopener">
            Lars Gröber
          </a>
        </p>
      </footer>
    );
  }
}
