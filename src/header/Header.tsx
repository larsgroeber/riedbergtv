import * as React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Config } from '../config';

export class Header extends React.Component {
  public render() {
    return (
      <div className="video-header">
        <video
          src="/assets/SeLF-Video-RiedbergTV.small.mp4"
          autoPlay
          muted
          loop
        />
        <div className="header">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <div
              style={{
                alignSelf: 'center',
                margin: '0 10px',
              }}
              className="text-center"
            >
              <img src={Config.logo.large} id="logo" />
              <a href="#videos">
                <button className="btn btn-primary d-none d-sm-inline-block">
                  Zu den Videos
                </button>
              </a>
              <Link to="/pages/jobs">
                <button className="btn btn-outline-primary ml-2">
                  Mach mit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
