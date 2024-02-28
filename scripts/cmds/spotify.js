const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "spotify",
    version: "1.0",
    author: "rehat--",
    countDown: 15,
    role: 0,
    longDescription: "Download spotify content.",
    category: "media",
    guide: {
      en: "{pn} link"
    }
  },

  onStart: async function ({ message, args }) {
    const link = args.join(" ");
    if (!link) {
      return message.reply("Please provide the link to the spotify content.");
    }

    try {
      const response = await axios.get(`https://public-apis-git-main-project86.vercel.app/api/spotify?url=${encodeURIComponent(link)}`, { responseType: 'json' });
message.reply("⬇ | Downloading the content for you");
      const data = response.data;
      const audioUrl = data.url;

      const audioResponse = await axios.get(audioUrl, { responseType: 'arraybuffer' });
      fs.writeFileSync(__dirname + '/cache/spotify.mp3', Buffer.from(audioResponse.data));

      message.reply({
        body: `• Title: ${data.title}\n• Album: ${data.album}\n• Artist: ${data.artist}\n• Released: ${data.released}`,
        attachment: fs.createReadStream(__dirname + '/cache/spotify.mp3')
      });
    } catch (error) {
      console.error(error);
      message.reply("Sorry, the spotify content could not be downloaded.");
    }
  }
};