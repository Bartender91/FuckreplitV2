const duelTimeouts = {};

module.exports = {
  config: {
    name: "fight",
    version: "1.2",
    author: "Shikaki",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Start a fight with another user.",
    },
    longDescription: {
      en: "Start a fight with another user and battle it out.",
    },
    category: "game",
    guide: {
      en: "{pn} <uid>",
    },
  },

  onStart: async function ({ api, event, args }) {
    if (args.length !== 1) {
      return api.sendMessage("Usage: .fight <uid>", event.threadID);
    }

    const targetUID = args[0];

    if (event.senderID === targetUID) {
      return api.sendMessage("You can't challenge yourself to a duel.", event.threadID);
    }

    const fighter1Name = await this.getUserDisplayName(api, event.senderID);
    const fighter2Name = await this.getUserDisplayName(api, targetUID);

    const fightStartMsg = `🥊 ${fighter1Name} has challenged ${fighter2Name} to a duel.\n\n${fighter2Name}, reply with "Accepted" within 120 seconds to accept the duel.\n\nAlternatively, you can reply with "Nah" to decline the duel.`;

    const senderTimeout = setTimeout(() => {
      clearTimeout(senderTimeout);
      duelTimeouts[event.senderID] = undefined;
      api.sendMessage(`The duel between ${fighter1Name} and ${fighter2Name} has been canceled due to inactivity.`, event.threadID);
    }, 120000);

    duelTimeouts[event.senderID] = senderTimeout;

    // Send the initial duel challenge message
    await api.sendMessage(fightStartMsg, event.threadID);

    // Listen for responses
    const listener = ({ event, api }) => {
      if (event.senderID === targetUID) {
        const responseText = event.body && event.body.toLowerCase().trim();
        if (responseText === "accepted") {
          // If "Accepted" is received, start the fight
          const senderTimeout = duelTimeouts[event.senderID];
          if (senderTimeout) {
            clearTimeout(senderTimeout);
            duelTimeouts[event.senderID] = undefined;
            api.sendMessage(`👊 The duel between ${fighter1Name} and ${fighter2Name} begins!\n\nBoth of you have 100 HP respectively.\n\n${fighter1Name}, reply to this message with an attack among:\n\n1. Punch\n2. Kick\n3. Slap`, event.threadID);
          }
        } else if (responseText === "nah") {
          // If "Nah" is received, cancel the duel immediately
          const senderTimeout = duelTimeouts[event.senderID];
          if (senderTimeout) {
            clearTimeout(senderTimeout);
            duelTimeouts[event.senderID] = undefined;
            api.sendMessage(`${fighter2Name} has declined the duel challenge offered by ${fighter1Name}.`, event.threadID);
          }
        }
      }
    };

    // Add the listener for incoming messages
    api.onMessage(listener);
  },

  getUserDisplayName: async function (api, userID) {
    const userInfo = await api.getUserInfo(userID);
    return userInfo[userID].name || userID;
  },
};