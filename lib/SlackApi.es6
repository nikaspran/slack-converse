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
      }, (err, response, body) => {
        //console.log('=====');
        //console.log(path, queryParams, err, response.body);
        //console.log('=====');
        let json = body && JSON.parse(body);
        if (err || json.error) {
          reject(err || json.error);
        } else {
          resolve(json);
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

  setChannelTopic(channelId, topic) {
    SlackApi._assertRequired(channelId, 'channelId');
    return this._request({path: '/channels.setTopic', queryParams: {channel: channelId, topic: topic}});
  }

  listUsers() {
    return this._request({path: '/users.list'});
  }
}

export default SlackApi;