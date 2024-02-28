const axios = require("axios");

module.exports = {
 config: {
 name: "lyrics",
 aliases: ["lyric", "ly"],
 version: "1.0",
 author: "Samir",
 countDown: 5,
 role: 0,
 shortDescription: {
 en: "Get lyrics for a song",
 },
 longDescription: {
 en: "This command allows you to get the lyrics for a song. Usage: !lyrics <song name>",
 },
 category: "music",
 guide: {
 en: "{prefix}lyrics <song name>",
 },
 },

 onStart: async function ({ api, event, args }) {const axios = require("axios");
const google = require("googlethis");
const request = require("request");
let text = args.join(" ");
  if (!text) return api.sendMessage("Missing input", event.threadID, event.messageID)
const res = await google.search("Lyrics "+text);
console.log(res.knowledge_panel.lyrics)
 api.sendMessage("•———•°•Lyrics•°•———•\n\n"+res.knowledge_panel.lyrics+"\n\n"+"•———•°•The End•°•———•", event.threadID, event.messageID)
 },
};
                 