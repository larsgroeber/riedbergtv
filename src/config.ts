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
  apiBase: process.env.REACT_ENV_API_BASE || 'https://api.riedberg.tv',
  baseUrl: process.env.REACT_ENV_BASE_URL || 'https://riedbergtv.netlify.com',
  mapUrl: process.env.REACT_ENV_MAP_URL || 'https://riedbergtv-map.netlify.com',
  supportEmail: process.env.REACT_ENV_SUPPORT_MAIL || 'support@riedberg.tv',
  customBackend:
    process.env.REACT_ENV_CUSTOM_BACKEND || 'https://custom-api.riedberg.tv',
  videoRatio: 1.778,
};
