const axios = require('axios');

module.exports = {
  config: {
    name: "artgta",
    version: "1.0",
    author: "Rishad",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Image to GTA V"
    },
    longDescription: {
      en: "Image to GTA V"
    },
    category: "AI",
    guide: {
      en: "{pn} reply to image"
    }
  },

  onStart: async function ({ api, event }) {
    const imageLink = event.messageReply?.attachments[0]?.url;
    if (!imageLink) {
      return api.sendMessage('Please reply to an image.', event.threadID, event.messageID);
    }

    try {
      const apiUrl = `https://for-devs.onrender.com/api/artgta?imageUrl=${encodeURIComponent(imageLink)}&apikey=fuck`;
      const imageStream = await global.utils.getStreamFromURL(apiUrl);
      if (!imageStream) {
        return api.sendMessage('Failed to animate the image.', event.threadID, event.messageID);
      }
      return api.sendMessage({ attachment: imageStream }, event.threadID, event.messageID);
    } catch (error) {
      console.log(error);
      return api.sendMessage('Failed to animate the image.', event.threadID, event.messageID);
    }
  }
};