'use strict';
import SlackApi from './SlackApi';
import ConverseBot from './ConverseBot';
import MessageParser from './MessageParser';
import SlackListener from 'slack-client';

const SLACK_TOKEN = 'xoxp-7453471159-7453546145-7453440514-7ed12a';

let slackApi = new SlackApi(SLACK_TOKEN);
let slackListener = new SlackListener(SLACK_TOKEN, true, true);
let messageParser = new MessageParser();

let bot = new ConverseBot({
  slackApi,
  slackListener,
  messageParser
});

bot.start();