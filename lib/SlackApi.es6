'use strict';
import request from 'request';

class SlackApi {
  constructor(token) {
    this.token = token;
  }

  static _assertRequired(value, valueName) {
    if (!value) {
      throw new Error(`Parameter "${valueName}" is required`);
    }
  }

  _request({path, queryParams}) {
    return new Promise((resolve, reject) => {
      request({
        qs: {token: this.token, ...queryParams},
        url: `https://slack.com/api${path}`
      }, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
    });
  }

  createChannel(name) {
    SlackApi._assertRequired(name, 'name');
    return this._request({path: '/channels.create', queryParams: {name}});
  }
}

export default SlackApi;