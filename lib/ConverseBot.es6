'use strict';
class Converse {
  constructor({slackListener, messageParser, slackApi}) {
    this.slackListener = slackListener;
    this.messageParser = messageParser;
    this.slackApi = slackApi;
  }

  start() {
    this.slackListener.on('open', () => {
      console.log('Open!');
    });

    this.slackListener.on('message', (message) => {
      let startConversationCmd = this.messageParser.parseStartConversation(message.text);

      if (startConversationCmd) {
        let name = `cv ${startConversationCmd.topic}`.replace(/ /g, '-');
        this.slackApi.createChannel(name);
      }
    });

    this.slackListener.on('error', (error) => {
      console.log(`Error: ${error}`);
    });

    this.slackListener.login();
  }
}

export default Converse;