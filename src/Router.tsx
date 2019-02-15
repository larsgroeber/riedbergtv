import * as React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import { PageView } from './page/PageView';
import { VideoView } from './videos/VideoView';
import { Cookie } from './cookie/Cookie';

export class Router extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/pages/:slug" component={PageView} />
          <Route path="/videos/:slug" component={VideoView} />
          <ToastContainer />
          <Cookie />
        </div>
      </BrowserRouter>
    );
  }
}
