const fs = require("fs");
const axios = require("axios");

module.exports = {
  config: {
    name: "prodia",
    aliases: [],
    author: "kshitiz & arjhil",
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "generate an image"
    },
    category: "image",
    guide: {
      en: "[prompt | model]"
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      let text = args.join(" ");

      const prompt = text.substr(0, text.indexOf(' | '));
      const model = text.split(" | ").pop();

      if (!prompt || !model) {
        return api.sendMessage('Please provide a prompt and a model.', event.threadID);
      }

      const encodedPrompt = encodeURIComponent(prompt);

      const loadingMessage = 'Generating image. Please wait...';
      api.sendMessage(loadingMessage, event.threadID, event.messageID);

      const providedURL = `https://arjhil-prodia-api.arjhilbard.repl.co/sdxl/generate?prompt=${encodedPrompt}&model=${model}`;

      const response = await axios.get(providedURL, { responseType: 'stream' });

      api.sendMessage({
        attachment: response.data,
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while processing the sdxl command.', event.threadID);
    }
  }
};