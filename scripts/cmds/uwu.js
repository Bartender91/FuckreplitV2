const fs = require('fs');
module.exports = {
  config: {
    name: "uwu",
    version: "1.0",
    author: "KSHITIZ",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "uwu") {
      return message.reply({
        body: "uwu😚",
        attachment: fs.createReadStream("uwu.mp4"),
      });
    }
  }
};