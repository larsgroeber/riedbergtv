import * as React from 'react';
import { Config } from 'src/config';
import { Link } from 'react-router-dom';
import './Navbar.css';

interface Props {
  notFloating?: boolean;
  homePage?: boolean;
}

export class Navbar extends React.Component<Props> {
  public state = { showLogo: false };
  componentDidMount() {
    if (!this.props.notFloating) {
      const nav = document.getElementById('navbar');
      window.addEventListener(
        'scroll',
        () => {
          const offset = nav!.getBoundingClientRect() as DOMRect;
          if (offset.y > 0 && this.state.showLogo) {
            this.setState({ showLogo: false });
          }
          if (offset.y === 0 && !this.state.showLogo) {
            this.setState({ showLogo: true });
          }
        },
        undefined,
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => {});
  }

  public render() {
    return (
      <nav
        className={
          'navbar navbar-dark navbar-expand-sm' +
          (this.props.notFloating ? '' : ' sticky-top') +
          (this.props.homePage && !this.state.showLogo ? '' : ' center-links')
        }
        style={{
          width: '100%',
          backgroundColor: Config.theme.dark.backgroundColor,
          zIndex: 100,
          borderBottom: `5px solid ${Config.theme.primary}`,
        }}
        id="navbar"
      >
        <Link
          className={
            'navbar-brand' +
            (this.props.homePage && !this.state.showLogo ? ' d-none' : '')
          }
          to="/"
          style={{
            fontFamily: Config.theme.font.logo,
          }}
        >
          <img
            className="mr-1"
            src={Config.logo.icon}
            style={{
              height: '30px',
            }}
          />
          <span id="app-name">{Config.appName}</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                href={(this.props.homePage ? '' : Config.baseUrl) + '#videos'}
                style={{ color: Config.theme.primary }}
              >
                <span>Videos</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href={(this.props.homePage ? '' : Config.baseUrl) + '#ueber'}
                style={{ color: Config.theme.primary }}
              >
                <span>Über uns</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href={(this.props.homePage ? '' : Config.baseUrl) + '#map'}
                style={{ color: Config.theme.primary }}
              >
                <span>Interaktive Karte</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href={(this.props.homePage ? '' : Config.baseUrl) + '#team'}
                style={{ color: Config.theme.primary }}
              >
                <span>Team</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href={(this.props.homePage ? '' : Config.baseUrl) + '#faq'}
                style={{ color: Config.theme.primary }}
              >
                <span>FAQ</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href={(this.props.homePage ? '' : Config.baseUrl) + '#contact'}
                style={{ color: Config.theme.primary }}
              >
                <span>Kontakt</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
