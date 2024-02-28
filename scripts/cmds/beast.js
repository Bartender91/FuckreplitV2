const axios = require("axios");

module.exports = {
  config: {
    name: "beast",
    aliases: ["mrbeast"],
    version: "1.0",
    author: "JARiF",
    countDown: 0,
    role: 0,
    category: "Image",
    shortDescription: "",
    longDescription: "",
    guide: {
      en: "{pn} [prompt]",
    },
  },

  onStart: async function ({ api, args, message, event }) {
    try {
      let p = args.join('');

      const b = await axios.get(`https://www.api.vyturex.com/beast?query=${p}`);

      const f = b.data.audio;
      const k = b.data.txt;

      message.reply({
        body: `Your Prompt: ${k} `,
        attachment: await global.utils.getStreamFromURL(f),
      });
    } catch (error) {
      message.reply("Error" + error);
    }
  },
};