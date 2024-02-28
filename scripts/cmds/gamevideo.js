const axios = require('axios');

module.exports = {
  config: {
    name: "gamevideo",
    aliases: ["gvdo"],
    version: "1.0",
    author: "Strawhat Luffy & kshitiz",//remodified by kshitiz
    countDown: 20,
    role: 0,
    shortDescription: "get ml codm dota 2 or valorant random video",
    longDescription: "the bot will sent 3 random game vdo of valorant codm ml and dota 2",
    category: "Game",
    guide: "{pn}"
  },

  onStart: async function ({ message, args }) {
    const BASE_URL = `https://apibard.hvcker2004.repl.co/videogame`;
    message.reply("Loading random game video");

    try {
      let res = await axios.get(BASE_URL);

      if (res.data && res.data.data && res.data.data.play) {
        let mlbb = res.data.data.play;
        const form = {
          body: `here is your video💁‍♀️`
        };
        form.attachment = await global.utils.getStreamFromURL(mlbb);
        message.reply(form);
      } else {
        message.reply("Video not found in the response.");
      }
    } catch (e) {
      message.reply("An Error Occurred While Processing Your Request.");
      console.log(e);
    }
  }
};