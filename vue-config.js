const path = require('path');

const config = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
  },
  beDetails: {
    baseURL: 'http://localhost:5000/api/DeviceRecords',
  },
};
module.exports = config;
