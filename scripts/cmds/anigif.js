const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: 'animegif',
    aliases: ['anigif'],
    version: '1.0',
    author: 'Kshitiz',
    role: 0,
    category: 'anime',
    shortDescription: {
      en: 'Sends a random anime gif.'
    },
    longDescription: {
      en: 'Sends a random anime gif.'
    },
    guide: {
      en: '{pn} animegif'
    }
  },
  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get('https://anigif.onrender.com/kshitiz');

      if (response.status !== 200 || !response.data || !response.data.url) {
        throw new Error('Invalid or missing response from the API');
      }

      const gifUrl = response.data.url;

      const filePath = path.join(__dirname, `/cache/${Date.now()}.gif`);

      const writer = fs.createWriteStream(filePath);
      const responseStream = await axios.get(gifUrl, { responseType: 'stream' });

      responseStream.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      const messageID = await api.sendMessage({
        body: '',
        attachment: fs.createReadStream(filePath)
      }, event.threadID, event.messageID);

      if (!messageID) {
        throw new Error('Failed to send message with attachment');
      }

      console.log(`Sent anime gif ${messageID}`);
    } catch (error) {
      console.error(`Failed to send anime gif: ${error.message}`);
      api.sendMessage('Sorry, something went wrong. Please try again later.', event.threadID);
    }
  }
};
