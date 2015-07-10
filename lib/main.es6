'use strict';
import SlackApi from './SlackApi';
import ConverseBot from './ConverseBot';
import MessageParser from './MessageParser';
import SlackListener from 'slack-client';
import appConfig from '../appConfig.json';

const SLACK_TOKEN = appConfig.token;

let slackApi = new SlackApi(SLACK_TOKEN);
let slackListener = new SlackListener(SLACK_TOKEN, true, true);
let messageParser = new MessageParser();

let bot = new ConverseBot({
  slackApi,
  slackListener,
  messageParser
});

bot.start();