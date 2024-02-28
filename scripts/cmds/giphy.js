const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "giphy",
    version: "1.0",
    author: "mirai=>goatbot",
    category: "utility",
    role: 0,
    guide: {
      en: {}
    }
  },
  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    if (args.length === 0) {
      api.sendMessage('Please provide a search query for Giphy.', threadID, messageID);
      return;
    }

    const query = args.join(' ');
    const apiKey = 'QHv1qVaxy4LS3AmaNuUYNT9zr40ReFBI';

    try {
      const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: {
          q: query,
          api_key: apiKey,
          limit: 5,
          rating: 'g'
        }
      });

      if (response.data.data && response.data.data.length > 0) {
        const gifResults = response.data.data;

        const gifAttachments = [];
        for (let i = 0; i < gifResults.length; i++) {
          const gifData = gifResults[i];
          const gifURL = gifData.images.original.url;

          const path1 = path.join(__dirname, `cache/giphy${i}.gif`);
          const getContent = (await axios.get(gifURL, { responseType: 'arraybuffer' })).data;
          fs.writeFileSync(path1, Buffer.from(getContent, 'binary'));
          gifAttachments.push(fs.createReadStream(path1));
        }

        api.sendMessage({
          attachment: gifAttachments
        }, threadID);
      } else {
        api.sendMessage('No GIFs found for the provided query.', threadID, messageID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while searching for GIFs.', threadID, messageID);
    }
  }
};