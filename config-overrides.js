const path = require('path');

module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@components': path.resolve(__dirname, 'src/components'),
    '@game': path.resolve(__dirname, 'src/game'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@images': path.resolve(__dirname, 'src/assets/images'),
    '@Contexts': path.resolve(__dirname, 'src/Contexts'),
    '@client': path.resolve(__dirname, 'src/client'),
    '@utils': path.resolve(__dirname, 'src/utils'),
  };

  config.resolve.modules = [
    path.resolve(__dirname, 'src'),
    'node_modules',
  ];

  return config;
};
