const fetch = require('node-fetch');

module.exports = {
  config: {
    name: "texttobin",
    aliases: [],
    version: "1.0",
    author: "EdiNST",
    countDown: 10,
    role: 2,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: ""
    },
    category: "owner",
    guide: {
      en: ""
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const text = args.join(" ");

      if (!text) {
        return api.sendMessage("Please provide a text to upload to Pastebin.", event.threadID);
      }

      const apiKey = "aeGtA7rxefvTnR3AKmYwG-jxMo598whT";
      const apiUrl = `https://pastebin.com/api/api_post.php`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: `api_dev_key=${apiKey}&api_option=paste&api_paste_code=${encodeURIComponent(text)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const data = await response.text();

      if (data.startsWith("Bad API request")) {
        return api.sendMessage("Failed to upload text to Pastebin.", event.threadID);
      }

      return api.sendMessage(`Text uploaded to Pastebin. Here is the link: ${data}`, event.threadID);
    } catch (error) {
      console.error(error);
      return api.sendMessage("An error occurred while processing the command.", event.threadID);
    }
  }
};