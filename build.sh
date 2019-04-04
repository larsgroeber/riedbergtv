#!/bin/bash

npm run build-css 
REACT_ENV_CUSTOM_BACKEND='https://custom-api.riedberg.tv' REACT_ENV_SUPPORT_MAIL='support@riedberg.tv' REACT_ENV_API_BASE='https://api.riedberg.tv' REACT_ENV_BASE_URL='https://riedbergtv.netlify.com' REACT_ENV_MAP_URL='https://riedbergtv-map.netlify.com' npx react-scripts-ts build
cp now.json public/