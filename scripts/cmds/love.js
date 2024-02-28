module.exports = {
	config: {
		name: "love",
		aliases: ["gg"],
		version: "1.0",
		author: "langit",
		countDown: 5,
		role: 0,
		shortDescription: "send",
		longDescription: "",
		category: "love",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
	 var link = [ 
"https://i.pinimg.com/originals/1a/26/e5/1a26e51bfd0aa963e0a48618175a9836.gif",
]

let gif= link[Math.floor(Math.random()*link.length)]
message.send({
  body: '「 love you baby🤭 」',attachment: await global.utils.getStreamFromURL(gif)
})
}
     }