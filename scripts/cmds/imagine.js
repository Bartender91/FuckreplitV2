const axios = require('axios');

module.exports = {
  config: {
    name: 'imagine',
    version: '1.0',
    author: 'OtinXSandip',
    countDown: 0,
    role: 0,
    longDescription: {
      en: 'Text to Image'
    },
    category: 'ai',
    guide: {
      en: `{pn} prompt`
    }
  },

  onStart: async function ({ message, api, args, event }) {
    const prompt = args.join(' ');
    
    if (!prompt) {
      return message.reply("Soraty e");
    }
    
   
    const baseURL = `https://sandipapi.onrender.com/imagine?prompt=${prompt}`;
    
    
    message.reply("✅| Generating please wait.", async (err, info) => {
      message.reply({ 
body: `✅`,
        attachment: await global.utils.getStreamFromURL(baseURL)
      });
      let ui = info.messageID;
      message.unsend(ui);
      
    });
  }
};