module.exports = {
  config: {
    name: "gemoji",
    aliases: ["groupemoji"],
    version: "1.0",
    author: "JARiF",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "box chat",
    guide: "{pn}"
  },

  onStart: async function({ api, event, args }) {
    var emoji = args.join(" ");
    if (!emoji) {
      api.sendMessage("You have not entered an Emoji", event.threadID, event.messageID);
    } else {
      api.changeThreadEmoji(emoji, event.threadID, (err) => {
        if (err) {
          console.error(err);
          api.sendMessage("Failed to change the Emoji", event.threadID, event.messageID);
        } else {
          api.sendMessage(`🔨 The bot successfully changed the Emoji to: ${emoji}`, event.threadID, event.messageID);
        }
      });
    }
  }
};