const axios = require('axios');

module.exports = {
  config: {
    name: "emojistory",
    aliases: ["story"],
    version: "1.0",
    author: "Kshitiz",
    role: 0,
    shortDescription: "Generate a story based on emojis.",
    longDescription: "Generate a story based on emojis .",
    category: "fun",
    guide: {
      en: "{p}emojistory <emojis>"
    }
  },

  onStart: async function ({ message, args }) {
    const emojiRegex = /[\uD800-\uDFFF]./;

    if (args.length === 0 || !emojiRegex.test(args[0])) {
      await message.reply("Please provide at least one emoji to generate a story.");
      return;
    }

    const emojis = args[0];
    const loadingMessage = await message.reply("Generating story...");

    try {
      const response = await axios.get(`https://emojistory-f217.onrender.com/kshitiz?emoji=${emojis}`);
      const story = response.data.response;

      await message.reply(story);
    } catch (error) {
      console.error("Error fetching story:", error);
      await message.reply("Sorry, an error occurred while generating the story.");
    }

    try {
      await message.unsend(loadingMessage.messageID);
    } catch (error) {
      console.error("Error while unsending loading message:", error);
    }
  }
};
