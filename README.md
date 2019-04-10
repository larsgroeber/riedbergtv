# RiedbergTV website and backend

[![Netlify Status](https://api.netlify.com/api/v1/badges/dfce977e-91e8-4402-b214-e0c8d111c6f3/deploy-status)](https://app.netlify.com/sites/riedbergtv/deploys)

Build with react and strapi.

## Development

```
npm start                       # starts frontend dev server
cd rtv-backend && npm start     # starts main backend (strapi)
cd custom-backend && npm start  # starts custom backend (express)
```

## Build

```
npm build   # build frontend to /public
```

## Why two backends?

Strapi handles all admin tasks (e.g. adding new videos, texts, sites) while the 'custom-backend' handles streaming video files (strapi does not handle range requests well) and sending emails via sendgrid.
