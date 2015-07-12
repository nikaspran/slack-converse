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
        if (err || response.error) {
          reject(err || response.error);
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

  inviteToChannel(channelId, userId) {
    SlackApi._assertRequired(channelId, 'channelId');
    SlackApi._assertRequired(userId, 'userId');
    return this._request({path: '/channels.invite', queryParams: {channel: channelId, user: userId}});
  }

  listUsers() {
    return this._request({path: '/users.list'});
  }
}

export default SlackApi;