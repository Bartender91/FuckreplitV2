const axios = require("axios");
const fs = require("fs-extra");
const ytdl = require("@distube/ytdl-core");
const request = require("request");
const yts = require("yt-search");
const os = require("os");
const path = require("path");

module.exports = {
  config: {
    name: "sing",
    version: "1.0",
    role: 0,
    author: "AceGun",
    cooldowns: 5,
    shortdescription: "Download music",
    longdescription: "Down music from Youtube",
    category: "media",
    usages: "{pn}music name",
  },

  onStart: async ({ api, event }) => {
    const input = event.body;
    const text = input.substring(12);
    const data = input.split(" ");

    if (data.length < 2) {
      return api.sendMessage("Please specify a music name!", event.threadID);
    }

    data.shift();
    const musicName = data.join(" ");

    try {
      api.sendMessage(`Searching music "${musicName}", please wait...`, event.threadID);

      const searchResults = await yts(musicName);
      if (!searchResults.videos.length) {
        return api.sendMessage("No music found.", event.threadID, event.messageID);
      }

      const music = searchResults.videos[0];
      const musicUrl = music.url;

      const stream = ytdl(musicUrl, { filter: "audioonly" });

      const fileName = `${event.senderID}.mp3`;
      const tempDir = os.tmpdir(); // Get the system's temporary directory
      const filePath = path.join(tempDir, fileName); // Create a path in the temporary directory

      stream.pipe(fs.createWriteStream(filePath));

      stream.on("response", () => {
        console.info("[DOWNLOADER]", "Starting download now!");
      });

      stream.on("info", (info) => {
        console.info("[DOWNLOADER]", `Downloading music: ${info.videoDetails.title}`);
      });

      stream.on("end", async () => {
        console.info("[DOWNLOADER] Downloaded");

        if (fs.statSync(filePath).size > 26214400) {
          fs.unlinkSync(filePath);
          return api.sendMessage("❌ | The file could not be sent because it is larger than 25MB.", event.threadID);
        }

        const message = {
          body: `💁🏻‍♂ • Here's your music!\n\n♥ • Title: ${music.title}\n⏰ • Duration: ${music.duration.timestamp}`,
          attachment: fs.createReadStream(filePath),
        };

        api.sendMessage(message, event.threadID, () => {
          // Delete the file after sending
          fs.unlinkSync(filePath);
        });
      });
    } catch (error) {
      console.error("[ERROR]", error);
      api.sendMessage("Sorry, an error occurred while processing the command.", event.threadID);
    }
  },
};