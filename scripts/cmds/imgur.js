const axios = require('axios');

module.exports = {
  config: {
    name: "imgur",
    aliases: ["imgr"],
    version: "1.0",
    author: "Jun",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Upload image to imgur"
    },
    longDescription: {
      en: "Upload image to imgur by replying to a photo"
    },
    category: "tools",
    guide: {
      en: ""
    }
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID, type, messageReply } = event;

    if (type === "message_reply" && messageReply.attachments[0]?.type === "photo") {
      try {
        const imgurLinks = [];
        for (let i of messageReply.attachments) {
          const attachment = i;
          const imageURL = attachment.url;
          const response = await axios.get(`https://api-test.yourboss12.repl.co/api/others/imgur?url=${encodeURIComponent(imageURL)}`);
          const imgurLink = response.data.imgurlink;
          imgurLinks.push(imgurLink);
        }
        api.sendMessage(imgurLinks.join('\n'), threadID, messageID);
      } catch (error) {
        console.log(error);
        api.sendMessage('Failed to upload image to imgur.', threadID, messageID);
      }
    } else {
      api.sendMessage('Please reply to a photo.', threadID, messageID);
    }
  }
};