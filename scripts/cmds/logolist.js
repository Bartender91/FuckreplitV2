const fs = require('fs');

module.exports = {
  config: {
    name: "logolist",
    version: "1.0",
    author: "🇸🇦",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "admin",
  },
 
  onStart: async function() {},
 
  onChat: async function({ event, message, getLang, api }) {
    if (event.body) {
      const word = event.body.toLowerCase();
      switch (word) {
        case "logolist":
          const replies = [
            "list Metal, naruto, cloud, blackpink, artpaper? glass1, glass2, greenhorror, lightneon, matrix, neon, futureneon, transformer, flowerlogo, harry, gura, graffiti",
          ];
          api.setMessageReaction("❤", event.messageID, event.messageID, api); 
          const randomIndex = Math.floor(Math.random() * replies.length);
          message.reply({
            body: replies[randomIndex],
          });
          break;
        default:
          return; 
      }
    }
  },
};