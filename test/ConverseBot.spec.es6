'use strict';
import {expect, sinon} from './common';
import ConverseBot from '../lib/ConverseBot';

describe('ConverseBot', () => {
  let converseBot;
  let mockSlackListener;
  let mockMessageParser;
  let mockSlackApi;

  beforeEach(() => {
    converseBot = new ConverseBot({
      slackListener: mockSlackListener = {
        on: sinon.stub(),
        login: sinon.stub()
      },
      messageParser: mockMessageParser = {
        parseStartConversation: sinon.stub()
      },
      slackApi: mockSlackApi = {
        createChannel: sinon.stub()
      }
    });
  });

  it('should pass', () => {
    expect(converseBot).to.be.ok();
  });

  describe('start()', () => {
    it('should login with the slack listener', () => {
      converseBot.start();
      expect(mockSlackListener.login).toHaveBeen.called();
    });
  });

  describe('once running', () => {
    let triggerSlackEvent;
    beforeEach(() => {
      let eventListeners = {};
      triggerSlackEvent = (name, data) => eventListeners[name](data);
      mockSlackListener.on = (eventName, handler) => {
        eventListeners[eventName] = handler;
      };
      converseBot.start();
    });

    describe('on message', () => {
      describe('that does not match any pattern', () => {
        it('should not create any channels', () => {
          triggerSlackEvent('message', {text: 'does not match'});
          expect(mockSlackApi.createChannel).toHaveBeen.notCalled();
        });
      });
      describe('that matches the start conversation pattern', () => {
        beforeEach(() => {
          mockMessageParser.parseStartConversation.withArgs('startConversation').returns({
            topic: 'some topic',
            participants: ['p1', 'p2']
          });
        });
        it('should create a channel with a dasherized name', () => {
          triggerSlackEvent('message', {text: 'startConversation'});
          expect(mockSlackApi.createChannel).toHaveBeen.calledWith('cv-some-topic');
        });
      });
    });
  });
});