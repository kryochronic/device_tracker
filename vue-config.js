const path = require('path');

module.exports = {
  devtool: 'source-map',
  configureWebpack: {
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
  },
};
