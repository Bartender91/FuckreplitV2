
module.exports = {
  config: {
    name: "expression",
    aliases: ["express", "exp"],
    version: "1.1",
    author: "Re code by Luxion",
    countDown: 5,
    role: 0,
    shortDescription: "expression  with text",
    longDescription: "expression with text",
    category: "image",
    guide: {
      en: " {pn}"
    }
  },

onStart: async function ({ message,  }) {
	 var link = [ "https://i.imgur.com/qju18c7.jpg", "https://i.imgur.com/zwZpErd.jpg",  "https://i.imgur.com/NRsWYlw.jpg"
]
let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: `` ,attachment: await global.utils.getStreamFromURL(img)
})
}
     }