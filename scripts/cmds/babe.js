const axios = require("axios");
 
module.exports.config = {
    name: "babe",
aliases: ["bb"],
    version: "1",
    role: 0,
countdown: 5,
    author: "OtinXSandip",
    description: "Simsimi",
    category: "chat",
  
};
 
module.exports.onStart = async ({ api, event, args }) => {
    try {
        let message = args.join(" ");
        if (!message) {
            return api.sendMessage(`yes babe , love you 3000 ❤️‍🩹`, event.threadID, event.messageID);
        }
 
        const response = await axios.get(`https://simsimi.imtiaz18.repl.co/get?message=${message}`);
        const respond = response.data.response;
        api.sendMessage(respond, event.threadID, event.messageID);
    } catch (error) {
        console.error("An error occurred:", error);
        api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
    }
}