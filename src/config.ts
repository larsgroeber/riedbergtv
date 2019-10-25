const primary = '#c9e727';
const secondary = '#111';

export const Config = {
  appName: 'RiedbergTV',
  logo: {
    icon:
      '/assets/RiedbergTV2_0 Finale Logos/Weisses Logo/RiedbergTV 2_0 Logo weiss klein.png',
    small:
      '/assets/RiedbergTV2_0 Finale Logos/Weisser Text/RiedbergTV Logo 2_0 Text weiss klein.png',
    large:
      '/assets/RiedbergTV2_0 Finale Logos/Weisser Text/RiedbergTV Logo 2_0 Text weiss gross.png',
  },
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
    font: {
      logo: 'Bitter, serif',
    },
  },
  apiBase: process.env.REACT_ENV_API_BASE || 'https://api.riedberg.tv',
  baseUrl: process.env.REACT_ENV_BASE_URL || 'https://riedberg.tv',
  mapUrl: process.env.REACT_ENV_MAP_URL || 'https://riedbergtv-map.netlify.com',
  supportEmail: process.env.REACT_ENV_SUPPORT_MAIL || 'support@riedberg.tv',
  customBackend:
    process.env.REACT_ENV_CUSTOM_BACKEND || 'https://custom-api.riedberg.tv',
  videoRatio: 1.778,
};
