const axios = require('axios');
const path = require('path');
const fs = require('fs').promises;

module.exports = {
  config: {
    name: "nsfw",
    version: "1.0.2",
    author: "loufi",
    countDown: 8,
    role: 0,
    shortDescription: "get random porn",
    longDescription: "",
    category: "18+",
    guide: {
      en: "{pn} ",
    }
  },

  onStart: async function ({ api, event }) {
    try {
      const processingMessage = await api.sendMessage(
        {
          body: 'I am currently processing the video to send. Please be patient...',
        },
        event.threadID
      );

      const response = await axios.get('https://perversefamily.august-api.repl.co/random-video');

      if (response.status !== 200) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }

      const { title, url } = response.data;

      const mp4Url = url.replace(/\([a-z0-9]+)(?:[\#]|$)/i, '.mp4$1');

      const videoResponse = await axios.get(mp4Url, { responseType: 'arraybuffer' });

      const videoPath = path.join(__dirname, 'video.mp4');
      await fs.writeFile(videoPath, Buffer.from(videoResponse.data, 'binary'));

      const videoMessage = await api.sendMessage(
        {
          attachment: fs.createReadStream(videoPath),
          body: `Perverse Family - ${title}`,
        },
        event.threadID
      );

      await fs.unlink(videoPath);

      setTimeout(() => {
        api.unsendMessage(videoMessage.messageID);
      }, 25 * 60 * 1000);
    } catch (error) {
      console.error('Error processing Perverse Family command:', error);
      api.sendMessage(
        'An error occurred while processing the Perverse Family command.',
        event.threadID
      );
    }
  },
};