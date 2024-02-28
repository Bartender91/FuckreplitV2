// NARA iT: waifuinv.js Here's Your Requested File.

const fs = require("fs");

module.exports = {
  config: {
    name: "waifuinv",
    aliases: ["wi"],
    version: "1.0",
    author: "EDINST",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Get waifu inventory"
    },
    longDescription: {
      en: "Get waifu inventory from waifu.json file"
    },
    category: "games",
    guide: {
      en: "waifuinv"
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      // Read waifu.json file
      const waifuData = JSON.parse(fs.readFileSync("./waifu.json"));

      // Get user UID
      const uid = event.senderID;

      // Find waifu that matches the UID
      const userWaifus = waifuData.filter((waifu) => waifu.uid === uid);

      if (userWaifus.length > 0) {
        let waifuMessage = "";
        userWaifus.forEach((userWaifu) => {
          const stars = userWaifu.stars;
          waifuMessage += `Name: ${userWaifu.name}\nWaifu Name: ${userWaifu.waifuName}\nImage Link: ${userWaifu.link}\nStars: ${stars}\n─────────────────────\n`;
        });

        // Send waifu info as a message
        api.sendMessage(waifuMessage, event.threadID, event.messageID);
      } else {
        api.sendMessage("You don't have any waifu in your inventory.", event.threadID, event.messageID);
      }
    } catch (error) {
      console.log(error);
    }
  }
};