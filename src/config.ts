const primary = '#66cccc';
const secondary = '#111';

export const Config = {
  appName: 'RiedbergTV',
  theme: {
    light: {
      backgroundColor: primary,
      color: secondary,
    },
    dark: {
      backgroundColor: secondary,
      color: primary,
    },
    primary: primary,
    secondary: secondary,
  },
  apiBase: process.env.REACT_ENV_API_BASE || 'http://localhost:1337',
  baseUrl: process.env.REACT_ENV_BASE_URL || 'http://localhost:3000',
  mapUrl: process.env.REACT_ENV_MAP_URL || 'https://riedbergtv-map.netlify.com',
  supportEmail: process.env.REACT_ENV_SUPPORT_MAIL || 'support@riedberg.tv',
  customBackend:
    process.env.REACT_ENV_CUSTOM_BACKEND || 'http://localhost:5001',
  videoRatio: 1.778,
  production: process.env.REACT_ENV_CUSTOM_BACKEND,
};
