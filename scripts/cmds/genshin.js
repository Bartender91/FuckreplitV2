const axios = require('axios');
const fs = require("fs");

module.exports = {
  config: {
    name: "genshin",
    version: "1.0",
    author: "MILAN",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Tạo biểu ngữ tác động genshin.",
      en: "Create genshin impact banner."
    },
    longDescription: {
      vi: "Tạo biểu ngữ tác động genshin.",
      en: "Create genshin impact banner."
    },
    category: "image",
    guide: {
      vi: "{pn}",
      en: "{pn} code | name | slogan"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const info = args.join(" ");
    if (!info) {
      return message.reply(`Use properly baka!`);
    } else {
      const msg = info.split("|");
      if (msg.length < 3) {
        return message.reply(`Not enough parameters provided.`);
      }
      const id = msg[0].trim();
      const name = msg[1].trim();
      const sdt = msg[2].trim();

      try {
        const sentMessage = await message.reply("Initializing image, please wait...");
        const img = `https://api.dev-tantrik.repl.co/coverg?idCharacter=${id}&name=${name}&slogan=${sdt}&apikey=user-samir-12`;
        const response = await axios.get(img, { responseType: 'arraybuffer' });
        fs.writeFileSync(__dirname + "/assets/any.png", Buffer.from(response.data));
        await api.sendMessage({
          body: `✅ Your Banner \Name: ${name}\Slogan: ${sdt}\ID: ${id}`,
          attachment: fs.createReadStream(__dirname + "/assets/any.png")
        }, event.threadID, async (err, info) => {
          if (err) {
            console.error(err);
            await api.sendMessage("An error occurred while sending the banner.");
            return;
          }
          fs.unlinkSync(__dirname + "/assets/any.png");
          setTimeout(async () => {
            try {
              await api.unsendMessage(sentMessage.messageID);
            } catch (e) {
              console.error(e);
            }
          }, 1000); // unsend after 5 seconds
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
};