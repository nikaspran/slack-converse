'use strict';
class Converse {
  constructor({slackListener, messageParser}) {
    this.slackListener = slackListener;
    this.messageParser = messageParser;
  }

  start() {
    this.slackListener.on('open', () => {
      console.log('Open!');
    });

    this.slackListener.on('message', (message) => {
      console.log(this.messageParser.getCommand(message.text));
    });

    this.slackListener.on('error', (error) => {
      console.log(`Error: ${error}`);
    });

    this.slackListener.login();
  }
}

export default Converse;