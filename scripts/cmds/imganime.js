
const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
module.exports = {
  config: {
    name: "imganime",
    author: "Jun",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "",
    },
  },
onStart: async function ({ api, event })  {
		axios.get('https://anime.ocvat2810.repl.co/').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
						attachment: fs.createReadStream(__dirname + `/cache/shiba.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/shiba.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/shiba.${ext}`)).on("close", callback);
			})
}
};