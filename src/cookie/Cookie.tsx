import * as React from 'react';
import './Cookie.css';
import { Link } from 'react-router-dom';
import { Config } from 'src/config';

interface State {
  closed: boolean;
}

export class Cookie extends React.Component {
  state: State = { closed: false };

  private storageKey = 'cookie-banner';

  componentDidMount() {
    const closed = !!localStorage.getItem(this.storageKey);
    this.setState({ closed });
  }

  closed() {
    localStorage.setItem(this.storageKey, 'true');
    this.setState({ closed: true });
  }

  render() {
    return this.state.closed ? (
      <></>
    ) : (
      <div className="cookie-banner">
        <div>
          <h5>Diese Webseite nutzt Cookies. </h5>
          <p>
            Durch die Nutzung dieser Webseite stimmst du unserer Nutzung von
            Cookies zu.
          </p>
          <Link to="/pages/datenschutz" style={{ textDecoration: 'underline' }}>
            Datenschutz bei {Config.appName}
          </Link>
        </div>
        <button className="btn btn-sm" onClick={this.closed.bind(this)}>
          <i className="far fa-times-circle" />
        </button>
      </div>
    );
  }
}
