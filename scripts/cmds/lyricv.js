const axios = require("axios");

module.exports = {
  config: {
    name: "lyricv",
    version: "1.1",
    author: "NTKhang",
    countdown: 5,
    role: 0,
    shortDescription: {
      vi: "Nhận lời bài hát",
      en: "Get song lyrics",
    },
    longDescription: {
      vi: "Nhận lời bài hát với Hình ảnh của họ",
      en: "Get song lyrics with their Images",
    },
    category: "info",
    guide: {
      en: "{pn} <song name(s)>",
    },
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      const songs = args.join(" ");
      if (!songs) {
        return api.sendMessage("Please provide song name(s) separated by commas!", event.threadID, event.messageID);
      }

      const songList = songs.split(",");

      for (const song of songList) {
        const response = await axios.get("https://milanbhandari.imageapi.repl.co/lyrics", {
          params: {
            query: song.trim(),
          },
        });

        const data = response.data;

        const messageData = {
          body: `❏ Title: ${data.title || ''}\n\n❏ Artist: ${data.artist || ''}\n\n❏ Lyrics:\n\n${data.lyrics || ''}`,
          attachment: await global.utils.getStreamFromURL(data.image),
        };

        await api.sendMessage(messageData, event.threadID);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before sending the next song
      }
    } catch (error) {
      console.error(error);
      return api.sendMessage("Sowwe, song not found here, please use google...\n\nOr try again properly like .lyrics song name song author", event.threadID, event.messageID);
    }
  },
};