'use strict';
import request from 'request';

class SlackApi {
  constructor(token) {
    this.token = token;
  }

  _request(options) {
    return new Promise((resolve, reject) => {
      request({
        qs: {token: this.token},
        ...options
      }, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  hello() {
    console.log(`Token ${this.token}`);

    return this._request({url: 'https://slack.com/api/auth.test'}).then((response) => {
      console.log(response.body);
    });
  }
}

export default SlackApi;