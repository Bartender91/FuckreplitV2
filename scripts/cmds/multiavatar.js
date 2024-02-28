const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
    config: {
        name: "multiavatar",
        version: "1.0",
        author: "loufy | langit",
        countDown: 6,
        role: 0,
        category: "image"
    },

    onStart: async function ({ api, event, args }) {
        const apiKey = 'qQ1f2UeVN0zCuB';
        const name = args.join(" ");

        if (!name) {
            return api.sendMessage("Kindly provide a name to search a random avatar for you.", event.threadID, event.messageID);
        }

        const url = `https://api.multiavatar.com/${encodeURIComponent(name)}.png?apikey=${apiKey}`;
        const pathToAvatar = path.join(__dirname, '/cache/multiavatar.png');

        try {
            const response = await axios.get(url, { responseType: "arraybuffer" });
            fs.writeFileSync(pathToAvatar, Buffer.from(response.data, "binary"));

            api.sendMessage({
                body: "Here's your avatar:",
                attachment: fs.createReadStream(pathToAvatar)
            }, event.threadID, (error, messageInfo) => {
                if (!error) {
                    fs.unlinkSync(pathToAvatar);
                }
            });
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while generating the pixel avatar.", event.threadID, event.messageID);
        }
    }
};