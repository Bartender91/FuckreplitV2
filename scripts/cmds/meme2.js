const axios = require('axios');

module.exports = {
  config: {
    name: "meme2",
    aliases: ["meme2"],
    version: "1.0",
    author: "🎭",
    countDown: 5,
    role: 0,
    shortDescription: "random memes from subreddit",
    longDescription: "",
    category: "image",
    guide: {
en: "Here's the list of available memes categories:\===========Memes==========\conomy, programmer, lorl, funny, terriblefb, history, memes, dank, wholesome, relationship\=========Anime Memes=======\nime, lostpaus, anime3, anime2\=============Nsfw==========\orno, hentai, porn, adult, nsfw"
}
  },

  async onStart({ message, usersData, args, event, api }) {
    const categories = ["history", "adult", "memes", "dank", "porno", "wholesome", "relationship", "anime", "terriblefb", "porn", "lolr", "programmer", "economy", "anime2", "nsfw", "anime3", "hentai", "lostpause"];

    if (!args || args.length === 0 || !categories.includes(args[0].toLowerCase())) {
      api.sendMessage(`${this.config.guide.en}`, event.threadID, event.messageID);
      return;
    }

    try {
      const response = await axios.get('https://api-test.yourboss12.repl.co/reddit', {
        params: {
          data: args[0].toLowerCase(),
          credit: this.config.author
        }
      });

      const { Url: img, Author: author, Title: title } = response.data;

      api.sendMessage({
        body: `Author: ${author}\itle: ${title}`,
        attachment: await global.utils.getStreamFromURL(img)
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
    }
  },

  async onChat({ event, api }) {
    const category = event.body.toLowerCase();
    const categories = ["history", "adult", "memes", "dank", "porno", "wholesome", "relationship", "anime", "programmer", "porn", "terriblefb", "funny", "anime2", "relationship", "economy", "nsfw", "anime3", "hentai", "lostpause" ];
    if (categories.includes(category)) {
      try {
        const response = await axios.get('https://api-test.yourboss12.repl.co/reddit', {
          params: {
            data: category,
            credit: this.config.author
          }
        });

        const {
      Url: img,
          Author: author,
          Title: title
        } = response.data;

        api.sendMessage({
          body: `Author: ${author}\itle: ${title}`,
          attachment: await global.utils.getStreamFromURL(img)
        }, event.threadID, event.messageID);
      } catch (error) {
        console.error(error);
      }
    } 
}
};