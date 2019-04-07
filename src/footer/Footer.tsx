import * as React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import './Footer.css';

export class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div id="social-icons">
          <a
            href="https://www.facebook.com/riedbergtv/"
            target="_blank"
            ref="nooperner"
          >
            <i className="fab fa-facebook-square" />
          </a>
          <a href="https://www.instagram.com" target="_blank" ref="nooperner">
            <i className="fab fa-instagram" />
          </a>
        </div>
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
