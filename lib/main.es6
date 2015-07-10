'use strict';
import SlackApi from './SlackApi';
import ConverseBot from './ConverseBot';
import MessageParser from './MessageParser';
import SlackListener from 'slack-client';
import appConfig from '../appConfig.json';

let slackApi = new SlackApi(appConfig.slack.token);
let slackListener = new SlackListener(appConfig.slack.token, true, true);
let messageParser = new MessageParser();

let bot = new ConverseBot({
  slackApi,
  slackListener,
  messageParser
});

bot.start();