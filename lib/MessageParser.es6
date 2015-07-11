'use strict';
const BY_WITH = ' with ';

function splitParticipants(str) {
  return !str ? [] : str.split(/, |,| and /);
}

class MessageParser {
  parseStartConversation(message) {
    let [match, args] = message.match(/^!converse (?:about )?(.+)/) || [];
    if (!match) {
      return undefined;
    }

    //TODO: I'm not clever enough for this to be regexp right now
    let splitByWith = args.split(BY_WITH);
    let participants = splitParticipants(splitByWith.length > 1 && splitByWith.pop());
    let topic = splitByWith.join(BY_WITH); // since we oversplit before

    return {topic, participants};
  }
}

export default MessageParser;