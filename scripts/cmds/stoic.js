const axios = require('axios');

module.exports = {
  config: {
    name: "stoic",
    version: "1.0",
    author: "mirai=>goatbot",
    category: "image",
    role: 0,
    guide: {
      en: {},
    },
  },
  onStart: async function ({ api, event }) {
    const { threadID, messageID } = event;

    try {
      const response = await axios.get('https://api.themotivate365.com/stoic-quote');

      if (response.status === 200 && response.data && response.data.author && response.data.quote) {
        const author = response.data.author;
        const quote = response.data.quote;

        api.sendMessage(`🧘‍♂️ 𝗥𝗔𝗡𝗗𝗢𝗠 𝗦𝗧𝗢𝗜𝗖𝗜𝗦𝗠 𝗤𝗨𝗢𝗧𝗘\  ✏️ ${author}:\   – "${quote}"`, threadID, messageID);
      } else {
        api.sendMessage('No stoic quotes available at the moment.', threadID, messageID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while fetching a stoic quote.', threadID, messageID);
    }
  }
};