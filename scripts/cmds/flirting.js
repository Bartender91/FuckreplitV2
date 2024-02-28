const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
    config: {
        name: "flirting",
        version: "1.0",
        author: "SiAM",
        countdown: 2,
        role: 0,
        category: "Fun",
        ShortDescription: "Get a random pickup line",
        LongDescription: "Uses an API to generate a random pickup line.",
        guide: {
            en: "Just type {pn}"
        }
    },

    onStart: async function({ api, args, message, event }) {



      const { getPrefix } = global.utils;
       const p = getPrefix(event.threadID);
    const approvedmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/approved_main.json`));
    const bypassmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/bypass_id.json`));
    const bypassmUid = event.senderID;
    if (bypassmain.includes(bypassmUid)) {
      console.log(`User ${bypassmUid} is in bypass list. Skipping the main approval check.`);
    } else {
      const threadmID = event.threadID;
      if (!approvedmain.includes(threadmID)) {
        const msgSend = message.reply(`cmd 'pickupline' is locked 🔒...\n Reason : Bot's main cmd \nyou need permission to use all main cmds.\n\nType ${p}requestMain to send a request to admin`);
        setTimeout(async () => {
          message.unsend((await msgSend).messageID);
        }, 40000);
        return;
      }
    }  
      
        try {
            const response = await axios.get("https://api.popcat.xyz/pickuplines");
            const pickupline = response.data.pickupline;
            message.reply(pickupline);
        } catch (error) {
            message.reply("Sorry, the API is not responding. Please try again later.");
        }
    }
};