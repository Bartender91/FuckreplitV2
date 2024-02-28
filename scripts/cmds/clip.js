const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "clips",
    aliases: ["clip"],
    version: "1.0",
    author: "Rishad",
    countDown: 10,
    role: 0,
    shortDescription: "Get movie clips",
    longDescription: "Get movie clips",
    category: "movie",
    guide: "{pn} (text) \nExample: {pn} fuck you"
  },

  onStart: async function ({ message, args }) {
    const text = args.join(" ");

    if (!text) {
      message.reply("Add some text Baka 😑");
      return;
    }

    const BASE_URL = `https://for-devs.rishadapis.repl.co/api/movie/clips?apikey=fuck&text=${text}`;

    try {
      const response = await axios.get(BASE_URL);
      const clipUrl = response.data.data[0];

      const form = {
        body: "Here's your clip ✨"
      };

      if (clipUrl) {
        const clipResponse = await axios.get(clipUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(__dirname + '/cache/clips.mp4', Buffer.from(clipResponse.data));
        form.attachment = fs.createReadStream(__dirname + '/cache/clips.mp4');
      }

      message.reply(form);
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while fetching the clip.");
    }
  }
};