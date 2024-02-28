const axios = require('axios');

const fs = require("fs")
module.exports = {
	config: {
		name: "skin",
		aliases: ["myskin"],
		version: "1.0",
		author: "loufi",
		countDown: 5,
		role: 0,
		shortDescription: "",
		longDescription: "",
		category: "game",
		guide: "{pn}"
	},

	onStart: async function ({ api, message, args, event, usersData}) {
		var waifuimg = JSON.parse(fs.readFileSync('waifuimg.json', 'utf8'));

let uid = event.senderID

if(Object.keys(event.mentions)[0]) uid = Object.keys(event.mentions)[0]
    
		try {
			let name = await usersData.getName(uid)
      if(!waifuimg.hasOwnProperty(event.threadID)) return message.reply("please wait")
if(!waifuimg[event.threadID].usdata.hasOwnProperty(uid)) return message.reply(`BAKA!! ${Object.keys(event.mentions)[0]?name:"you"} 0 skin`)

      
			let res2 = arkndb[event.threadID].usdata[uid]
      let fbid = uid
     // let name = await usersData.getName(event.senderID)
      let waifus = res2.length
      let waifus_name = res2.join("\n↬").toUpperCase()
			const form = {
					body: `╭「mobile legends inv」`
				    + `\n│_`
					+ `\n❏ User id: ${fbid}`
					+ `\n❏ Name: ${name}`
					+ `\n❏ skin: ${waifus}`
					+ `\n↬ ${waifus_name}`
				};
			api.sendMessage(form, event.threadID, event.messageID);
		} catch (e) {
			console.log(e)
			message.reply('🥺 server busy')
		}

	}
};