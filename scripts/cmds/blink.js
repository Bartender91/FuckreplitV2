const DIG = require("discord-image-generation");
const fs = require("fs-extra");
module.exports = {
	config: {
		name: "blink",
 aliases: ["bl2"],
		version: "1.1",
		author: "NIB",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: "blink images"
		},
		longDescription: {
			vi: "",
			en: "generate blinking gifs with profile pictures"
		},
		category: "image",
		guide: "{pn}",
		
	},

onStart: async function ({ event, message, getLang, usersData}) {
  if(event.type == "message_reply"){
let links = []

for (var item of event.messageReply.attachments){
links.push(item.url)
}
  
const img = await new DIG.Blink().getImage(250, ...links)
		const pathSave = `${__dirname}/tmp/Blink.gif`;
		fs.writeFileSync(pathSave, Buffer.from(img));
		message.reply({
			attachment: fs.createReadStream(pathSave)
		}, () => fs.unlinkSync(pathSave));} else{
  message.reply("Reply to images")
    }
  }
};