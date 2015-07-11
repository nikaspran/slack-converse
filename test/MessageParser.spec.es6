'use strict';
import expect from 'expect.js';
import MessageParser from '../lib/MessageParser';

describe('MessageParser', () => {
  let messageParser;
  beforeEach(() => {
    messageParser = new MessageParser();
  });
  describe('parseStartConversation()', () => {
    it('should return undefined if the message does not start with !converse', () => {
      expect(messageParser.parseStartConversation('some random message')).not.to.be.ok();
    });
    it('should return undefined if the message contains !converse but does not start with it', () => {
      expect(messageParser.parseStartConversation('this !converse is cool')).not.to.be.ok();
    });
    describe('if the message starts with !converse', () => {
      it('should return an object', () => {
        expect(messageParser.parseStartConversation('!converse about something')).to.be.an('object');
      });
      describe('the topic', () => {
        it('should be parsed', () => {
          expect(messageParser.parseStartConversation('!converse some topic').topic).to.eql('some topic');
        });
        it('should ignore "about" immediately after !converse', () => {
          expect(messageParser.parseStartConversation('!converse about some topic').topic).to.eql('some topic');
        });
        it('should ignore everything after the last "with"', () => {
          expect(messageParser.parseStartConversation('!converse some topic with someone').topic).to.eql('some topic');
        });
      });
      describe('the participants', () => {
        it('should contain a single item if no separators are found', () => {
          expect(messageParser.parseStartConversation('!converse some topic with someone').participants).to.eql(['someone']);
        });
        it('should allow participants to be separated by commas', () => {
          expect(messageParser.parseStartConversation('!converse topic with someone, else').participants).to.eql(['someone', 'else']);
        });
        it('should only be set to the list after the last "with"', () => {
          expect(messageParser.parseStartConversation('!converse integration with service with someone').participants).to.eql(['someone']);
        });
      });
    });
  });
});