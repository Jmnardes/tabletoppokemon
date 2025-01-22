const path = require('path');

module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@Contexts': path.resolve(__dirname, 'src/Contexts'),
    '@game': path.resolve(__dirname, 'src/game'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@client': path.resolve(__dirname, 'src/client'),
  };

  config.resolve.modules = [
    path.resolve(__dirname, 'src'),
    'node_modules',
  ];

  return config;
};
