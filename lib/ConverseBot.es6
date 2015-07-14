'use strict';
function handleError(err) {
  console.error(err);
}

class Converse {
  constructor({slackListener, messageParser, slackApi}) {
    this.slackListener = slackListener;
    this.messageParser = messageParser;
    this.slackApi = slackApi;
    this._usersByName = {};
  }

  start() {
    this.slackListener.on('open', () => {
      console.log('Connected');
      this.slackApi.listUsers().then((response) => {
        let members = response.members;
        members.forEach((member) => {
          this._usersByName[member.name] = member;
        });
      }).catch(handleError);
    });

    this.slackListener.on('message', (message) => {
      let startConversationCmd = this.messageParser.parseStartConversation(message.text);

      if (startConversationCmd) {
        let name = `cv ${startConversationCmd.topic}`.replace(/ /g, '-');

        this.slackApi.createChannel(name).then(({channel}) => {
          this.slackApi.setChannelTopic(channel.id, startConversationCmd.topic);
          this.slackApi.inviteToChannel(channel.id, message.user);
          startConversationCmd.participants.forEach((participantName) => {
            this.slackApi.inviteToChannel(channel.id, this._usersByName[participantName].id);
          });
        }).catch(handleError);
      }
    });

    this.slackListener.on('error', (error) => {
      console.log(`Error: ${error}`);
    });

    this.slackListener.login();
  }
}

export default Converse;