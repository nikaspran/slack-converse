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

  describe('inviteToChannel()', () => {
    it('should require a channelId', () => {
      expect(slackApi.inviteToChannel).to.withArgs(undefined, 'userId').throwException(/Parameter "channelId" is required/);
    });
    it('should require a userId', () => {
      expect(slackApi.inviteToChannel).to.withArgs('channelId', undefined).throwException(/Parameter "userId" is required/);
    });
    it('should do a GET request at /api/channels.invite with the "channel" and "user" query params', () => {
      scope = scope.get('/api/channels.invite').query({
        token: MOCK_TOKEN,
        channel: 'aChannel',
        user: 'aUser'
      }).reply(200);
      return slackApi.inviteToChannel('aChannel', 'aUser').then(scope.done);
    });
  });

  describe('listUsers()', () => {
    it('should do a GET request at /api/users.list and return the data', () => {
      scope = scope.get('/api/users.list').query({token: MOCK_TOKEN}).reply(200, 'result');
      return slackApi.listUsers('someName').then((result) => {
        expect(result).to.eql('result');
        scope.done();
      });
    });
  });
});