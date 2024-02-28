const axios = require("axios");
const fs = require("fs-extra");
const ytdl = require("ytdl-core");
const request = require("request");
const yts = require("yt-search");

module.exports = {
  config: {
    name: "vps",
    aliases: ["bro"],
    version: "1.5",
    role: 0,
    author: "AceGun",
    countDown: 5,
    shortDescription: "",
    longDescription: "Find your favorite song lyrics, music, or video",
    category: "music",
    guide: {
        vi: "",
        en: "{pn} -p or -play title\n{pn} -s or -sing title\n{pn} -v or -video title",
    },
    dependencies: {
      "fs-extra": "",
      "request": "",
      "axios": "",
      "ytdl-core": "",
      "yt-search": ""
    }
  },

  onStart: async ({ api, event }) => {
    const input = event.body;
    const text = input.substring(12);
    const data = input.split(" ");
    const command = data[1]; // Get the command (-p, -s, -v)
    data.splice(0, 2); // Remove the command and "-v" from the data

    if (data.length < 1) {
      return api.sendMessage("🙏 | Please provide a Title", event.threadID);
    }

    const query = data.join(" ");

    try {
      if (command === "-p" || command === "-play") {
        // Lyrics with audio
        api.setMessageReaction("⏳", event.messageID, event.messageID, api);
        
        const searchMessage = await api.sendMessage(`✅ | Searching music and lyrics of "${query}".\n⏳ | Please wait...`, event.threadID);

        const res = await axios.get(`https://api.heckerman06.repl.co/api/other/lyrics2?song=${encodeURIComponent(query)}`);
        const lyrics = res.data.lyrics || "Not found!";
        const title = res.data.title || "Not found!";
        const artist = res.data.artist || "Not found!";

        // Download audio and send it with lyrics
        const searchResults = await yts(query);
        if (!searchResults.videos.length) {
          return api.sendMessage("Error: Invalid request.", event.threadID, event.messageID);
        }

        const video = searchResults.videos[0];
        const videoUrl = video.url;

        const stream = ytdl(videoUrl, { filter: "audioonly" });

        const fileName = `${event.senderID}.mp3`;
        const filePath = __dirname + `/cache/${fileName}`;

        stream.pipe(fs.createWriteStream(filePath));

        stream.on('response', () => {
          console.info('[DOWNLOADER]', 'Starting download now!');
        });

        stream.on('info', (info) => {
          console.info('[DOWNLOADER]', `Downloading ${info.videoDetails.title} by ${info.videoDetails.author.name}`);
        });

        stream.on('end', () => {
          console.info('[DOWNLOADER] Downloaded');

          if (fs.statSync(filePath).size > 26214400) {
            fs.unlinkSync(filePath);
            return api.sendMessage('[ERR] The file could not be sent because it is larger than 25MB.', event.threadID);
          }

          const message = {
            body: `Here's your music, enjoy!🥰\n\nTitle: ${title}\nArtist: ${artist}\n\nLyrics: ${lyrics}`,
            attachment: fs.createReadStream(filePath)
          };
          api.unsendMessage(searchMessage.messageID); 

          api.setMessageReaction("🎶", event.messageID, event.messageID, api);

          api.sendMessage(message, event.threadID, () => {
            fs.unlinkSync(filePath);
          });
        });

      } else if (command === "-s" || command === "-sing") {
        // Audio only
        api.setMessageReaction("⏳", event.messageID, event.messageID, api);

        const searchMessage = await api.sendMessage(`✅ | Searching music name "${query}".\n⏳ | Please wait...`, event.threadID);

        const searchResults = await yts(query);
        if (!searchResults.videos.length) {
          api.unsendMessage(searchMessage.messageID); // Remove the initial "Searching music..." message since no music was found
          return api.sendMessage("No music found.", event.threadID, event.messageID);
        }

        const music = searchResults.videos[0];
        const musicUrl = music.url;

        const stream = ytdl(musicUrl, { filter: "audioonly" });

        const fileName = `${event.senderID}.mp3`;
        const filePath = __dirname + `/cache/${fileName}`;

        stream.pipe(fs.createWriteStream(filePath));

        stream.on('response', () => {
          console.info('[DOWNLOADER]', 'Starting download now!');
        });

        stream.on('info', (info) => {
          console.info('[DOWNLOADER]', `Downloading music: ${info.videoDetails.title}`);
        });

        stream.on('end', async () => {
          console.info('[DOWNLOADER] Downloaded');

          if (fs.statSync(filePath).size > 26214400) {
            fs.unlinkSync(filePath);
            api.unsendMessage(searchMessage.messageID); // Remove the initial "Searching music..." message since the file is too large
            return api.sendMessage('❌ | The file could not be sent because it is larger than 25MB.', event.threadID);
          }

          const message = {
            body: `💁‍♀️ | Here's your music\n\n🎶 | Title: ${music.title}\n⏰ | Duration: ${music.duration.timestamp}`,
            attachment: fs.createReadStream(filePath)
          };

          api.unsendMessage(searchMessage.messageID); 

          api.setMessageReaction("🎶", event.messageID, event.messageID, api);

          api.sendMessage(message, event.threadID, () => {
            fs.unlinkSync(filePath);
          });
        });

      } else if (command === "-v" || command === "-video") {
        // Video only
        api.setMessageReaction("⏳", event.messageID, event.messageID, api);
        
        const searchMessage = await api.sendMessage(`✅ | Searching video name "${query}".\n⏳ | Please wait...`, event.threadID);

        const searchResults = await yts(query);
        if (!searchResults.videos.length) {
          return api.sendMessage("No videos found.", event.threadID, event.messageID);
        }

        const video = searchResults.videos[0];
        const videoUrl = video.url;

        const stream = ytdl(videoUrl, { filter: "audioandvideo" });

        const fileName = `${event.senderID}.mp4`;
        const filePath = __dirname + `/cache/${fileName}`;

        stream.pipe(fs.createWriteStream(filePath));

        stream.on('response', () => {
          console.info('[DOWNLOADER]', 'Starting download now!');
        });

        stream.on('info', (info) => {
          console.info('[DOWNLOADER]', `Downloading video: ${info.videoDetails.title}`);
        });

        stream.on('end', () => {
          console.info('[DOWNLOADER] Downloaded');

          if (fs.statSync(filePath).size > 26214400) {
            fs.unlinkSync(filePath);
            api.unsendMessage(searchMessage.messageID);
            
            return api.sendMessage('❌ | The file could not be sent because it is larger than 25MB.', event.threadID);
          }

          const message = {
            body: `💁‍♀️ | Here's your video\n\n🎞️ | Title: ${video.title}\n⏰ | Duration: ${video.duration.timestamp}`,
            attachment: fs.createReadStream(filePath)
          };
          api.unsendMessage(searchMessage.messageID); 

          api.setMessageReaction("🎞️", event.messageID, event.messageID, api);

          api.sendMessage(message, event.threadID, () => {
            fs.unlinkSync(filePath);
          });
        });
      } else {
        return api.sendMessage("Invalid command. Use -p, -s, or -v.", event.threadID);
      }
    } catch (error) {
      console.error('[ERROR]', error);
      api.sendMessage('🥺 | An error occurred while processing the command.', event.threadID);
    }
  }
};
