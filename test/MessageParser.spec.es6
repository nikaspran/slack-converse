'use strict';
import expect from 'expect.js';
import MessageParser from '../lib/MessageParser';

describe('MessageParser', () => {
  let messageParser;
  beforeEach(() => {
    messageParser = new MessageParser();
  });
  describe('getCommand()', () => {
    it('should return undefined if the message does not start with !chat', () => {
      expect(messageParser.getCommand('some random message')).not.to.be.ok();
    });
    describe('if the message starts with !chat', () => {
      it('should return an object', () => {
        expect(messageParser.getCommand('!chat about something')).to.be.an('object');
      });
      describe('the topic', () => {
        it('should be parsed', () => {
          expect(messageParser.getCommand('!chat some topic').topic).to.eql('some topic');
        });
        it('should ignore "about" immediately after !chat', () => {
          expect(messageParser.getCommand('!chat about some topic').topic).to.eql('some topic');
        });
        it('should ignore everything after the last "with"', () => {
          expect(messageParser.getCommand('!chat some topic with someone').topic).to.eql('some topic');
        });
      });
      describe('the participants', () => {
        it('should contain a single item if no separators are found', () => {
          expect(messageParser.getCommand('!chat some topic with someone').participants).to.eql(['someone']);
        });
        it('should allow participants to be separated by commas', () => {
          expect(messageParser.getCommand('!chat topic with someone, else').participants).to.eql(['someone', 'else']);
        });
        it('should only be set to the list after the last "with"', () => {
          expect(messageParser.getCommand('!chat integration with service with someone').participants).to.eql(['someone']);
        });
      });
    });
  });
});