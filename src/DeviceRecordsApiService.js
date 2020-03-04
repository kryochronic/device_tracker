import Vue from 'vue';
import axios from 'axios';

const config = require('../vue-config');
/* eslint-disable */
console.log('\n\r**********************\n\r' * 30);
console.log('The backend configred is :' + config.beDetails.baseURL);
/* eslint-enable */
const client = axios.create({
  baseURL: config.beDetails.baseURL,
  // baseURL: 'http://localhost:5000/api/DeviceRecords',
  json: true,
  transformRequest: [
    (data) => {
      /* eslint-disable */
      /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsForRegex": ["^data"] }]*/
      try{
        data.value = parseInt(data.value, 10);
      }
      catch(err)
      {

      }
      /* eslint-enable */
      return data;
    }, ...axios.defaults.transformRequest],
});


export default {
  async execute(method, resource, data) {
    const accessToken = await Vue.prototype.$auth.getAccessToken();
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((req) => req.data);
  },
  getAll() {
    return this.execute('get', '/');
  },
  create(data) {
    return this.execute('post', '/', data);
  },
  update(id, data) {
    return this.execute('put', `/${id}`, data);
  },
  delete(id) {
    return this.execute('delete', `/${id}`);
  },
};
