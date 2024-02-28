const axios = require("axios");

module.exports = {
  config: {
    name: "nft",
    version: "2.0",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    shortDescription: "Generate Images.",
    longDescription: "Featuring 12 billon nft avater",
    category: "useless nft",
 
  },
  onStart: async function ({ api, event, args, message }) {
    try {
      const [prompt] = args.join(' ')
      if (!prompt) {
        return message.reply("⚠️| Invalid input. Please provide prompt.");
      }
      let apiUrl = `https://card.odernder.repl.co/nft?name=${encodeURIComponent(prompt)}`;


      const creatingMessage = await message.reply('✨Generating NFT in a  Moment.✨');

      const form = {
        body: `Here's your imagination ✨.`
      };

      form.attachment = [];
      form.attachment[0] = await global.utils.getStreamFromURL(apiUrl);
      api.unsendMessage(creatingMessage.messageID);

      message.reply(form);
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while fetching response");
    }
  }
};