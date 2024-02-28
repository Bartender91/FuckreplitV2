const axios = require('axios');
module.exports = {
  config: {
    name: "liner",
    version: "1.0",
    author: "rehat--",
    countDown: 10,
    role: 0,
    longDescription: "Made With Chat GPT 3.5 Architecture Most Advance LLM Model",
    category: "ai",
    guide: {
      en: "{pn} <query>"
    }
  },
  onStart: async function ({ message, event, api, args }) {
    try {
      const prompt = args.join(" ");
      const llm = encodeURIComponent(prompt);
      api.setMessageReaction("⌛", event.messageID, () => { }, true);

      const res = await axios.get(`https://turtle-apis.onrender.com/api/liner?query=${llm}`);
      const result = res.data.answer;
      api.setMessageReaction("✅", event.messageID, () => { }, true);
      message.reply({
        body: `${result}`,
      });
    } catch (error) {
      console.error(error);
      api.setMessageReaction("❌", event.messageID, () => { }, true);
    }
  }
};