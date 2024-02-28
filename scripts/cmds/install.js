const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")
const wrapText = (ctx, text, maxWidth) => {
	return new Promise(resolve => {
		if (ctx.measureText(text).width < maxWidth) return resolve([text]);
		if (ctx.measureText('W').width > maxWidth) return resolve(null);
		const words = text.split(' ');
		const lines = [];
		let line = '';
		while (words.length > 0) {
			let split = false;
			while (ctx.measureText(words[0]).width >= maxWidth) {
				const temp = words[0];
				words[0] = temp.slice(0, -1);
				if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
				else {
					split = true;
					words.splice(1, 0, temp.slice(-1));
				}
			}
			if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
			else {
				lines.push(line.trim());
				line = '';
			}
			if (words.length === 0) lines.push(line.trim());
		}
		return resolve(lines);
	});
};

module.exports = {
	config: {
		name: "install",
		aliases: ["playstore"],
		version: "1.0",
		author: "MILAN",
		countDown: 5,
		role: 0,
		shortDescription: "Edit Pictures",
		longDescription: "",
		category: "fun",
		guide: {
			vi: "{pn} [@tag | blank]",
			en: "{pn} [@tag | blank]"
		}
	},
onStart: async function ({ message, args, api, user, event, usersData }) {
 let { senderID, threadID, messageID } = event;
 const { loadImage, createCanvas } = require("canvas");
 const fs = require('fs-extra');
 const axios = require('axios');
 let pathImg = __dirname + "/assets/wanted.png";
 let pathAva = __dirname + "/assets/avatar.png";
 if (!args[0]) { var uid = senderID}
 if(event.type == "message_reply") { uid = event.messageReply.senderID }
 if (args.join().indexOf('@') !== -1){ var uid = Object.keys(event.mentions) } 
 let Avatar = (
 await axios.get(
 `https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
 { responseType: "arraybuffer" }
 )
 ).data;
 fs.writeFileSync(pathAva, Buffer.from(Avatar, "utf-8"));
 let getWanted = (
 await axios.get(`https://imgur.com/KDKgqvq.png`, {
 responseType: "arraybuffer",
 })
 ).data;
 fs.writeFileSync(pathImg, Buffer.from(getWanted, "utf-8"));
 let baseImage = await loadImage(pathImg);
 let baseAva = await loadImage(pathAva);
 let canvas = createCanvas(baseImage.width, baseImage.height);
 let ctx = canvas.getContext("2d");
 ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
 ctx.drawImage(baseAva, 65, 142, 70, 70);
 ctx.beginPath();
 ctx.fillStyle = "#000000";
 ctx.font = "200 35px Arial-black"; 
 ctx.textAlign = "start";
 
 let senderName = args.join(" ") && args.join(" ").replace(/@/g, "") || await usersData.getName(senderID); 
 
 const lines = await wrapText(ctx, senderName, 1160);
 ctx.fillText(lines.join('\n'), 200,150);//comment
 
 
const imageBuffer = canvas.toBuffer();
 fs.writeFileSync(pathImg, imageBuffer);
 fs.removeSync(pathAva);
 return api.sendMessage(
 {body: '', attachment: fs.createReadStream(pathImg) },
 threadID,
 () => fs.unlinkSync(pathImg),
 messageID
 );
}

	};