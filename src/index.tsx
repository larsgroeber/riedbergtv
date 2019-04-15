import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from './Router';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn:
    'https://83b013422dd049be868d5729fda37ce4@po-sentry.physikelearning.de/20',
});

ReactDOM.render(<Router />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
