module.exports = {
	config: {
		name: "pixxx",
		aliases: ["xxx"],
		version: "1.0",
		author: "langit",
		countDown: 50,
		role: 0,
		shortDescription: "😆",
		longDescription: "😭",
		category: "18+",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
	 var link = [ 
"https://i.imgur.com/qvfagV9.png",
"https://i.imgur.com/ndPZNm5.png",
"https://i.imgur.com/eohl54D.png",
"https://i.imgur.com/DFgKUdH.png",
"https://i.imgur.com/WokgoQA.png",
"https://i.imgur.com/KF6R13n.png",
"https://i.imgur.com/UMBOm31.png",
"https://i.imgur.com/uMloySH.png",
"https://i.imgur.com/QRsXQzV.png",
"https://i.imgur.com/Il0e7U9.png",
"https://i.imgur.com/eLeQ4Sd.png",
"https://i.imgur.com/niFQvd6.png",
"https://i.imgur.com/cNHkP8C.png",
"https://i.imgur.com/TmJsZC1.png",
"https://i.imgur.com/ysDorJ8.png",
"https://i.imgur.com/A5InQC9.png",
"https://i.imgur.com/wNmtipw.png",
"https://i.imgur.com/9ma1wea.png",
"https://i.imgur.com/Vo1JUkQ.png",
"https://i.imgur.com/j44arps.png",
"https://i.imgur.com/3OGDwNH.png",
]
let img = link[Math.floor(Math.random()*link.length)]
message.send({
body: 'what👀',attachment: await global.utils.getStreamFromURL(img)
})
}
}