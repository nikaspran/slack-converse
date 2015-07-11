'use strict';
import {expect} from './common';
import nock from 'nock';
import SlackApi from '../lib/SlackApi';

describe('SlackApi', () => {
  const MOCK_TOKEN = 'xxx';
  let slackApi;
  let scope;

  beforeEach(() => {
    scope = nock('https://slack.com');
    slackApi = new SlackApi(MOCK_TOKEN);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('createChannel()', () => {
    it('should require a name', () => {
      expect(slackApi.createChannel).to.throwException(/Parameter "name" is required/);
    });
    it('should do a GET request at /api/channels.create with the "name" query param', () => {
      scope = scope.get('/api/channels.create').query({token: MOCK_TOKEN, name: 'someName'}).reply(200);
      return slackApi.createChannel('someName').then(scope.done);
    });
  });
});