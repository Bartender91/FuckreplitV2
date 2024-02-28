const fs = require('fs');
module.exports = {
  config: {
    name: "amongus",
    version: "1.0",
    author: "×××",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "amongus") {
      return message.reply({
        body: "amongus SUS",
        attachment: fs.createReadStream("amongus.mp4"),
      });
    }
  }
};