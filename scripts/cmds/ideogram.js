const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: 'ideogram',
    version: '1.0',
    author: 'JARiF',
    countDown: 15,
    role: 0,
    shortDescription: '',
    longDescription: 'Generate images by Ideogram AI',
    category: 'download',
    guide: {
      en: '{pn} prompt',
    },
  },

  onStart: async function ({ api, message, args }) {
    try {
      const prompt = args.join(''); 

      const wm = await message.reply('Processing your images may take up to 1 minute...');

      const apiResponse = await axios.get(`https://www.annie-jarif.repl.co/ideogram?prompt=${encodeURIComponent(prompt)}`);
      const imageUrls = apiResponse.data.imageUrls;

      const imgData = [];

      for (let i = 0; i < imageUrls.length; i++) {
        const imgResponse = await axios.get(imageUrls[i], { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await message.reply({
        attachment: imgData,
      });

      await fs.remove(path.join(__dirname, 'cache'));
    } catch (error) { 
      return message.reply(error.message);
    }
  },
};