const axios = require("axios");
 
module.exports.config = { 
    name: "teach",
    version: "1",
    role: 0,
countdown: 5,
    author: "OtinXSandip",
    description: "Teach Simsimi",
    category: "chat",
};
 
 
module.exports.onStart = async ({ api, event, args }) => {
    try {
    
 
        const text = args.join(" ");
        const text1 = text.substr(0, text.indexOf(" | "));
        const text2 = text.split(" | ").pop();
 
        if (!text1 || !text2) {
            return api.sendMessage(`Usage: ${global.config.PREFIX}teach hi | hello`, event.threadID, event.messageID);
        }
 
        const response = await axios.get(`https://simsimi.imtiaz18.repl.co/teach?question=${encodeURIComponent(text1)}&answer=${encodeURIComponent(text2)}`);
        api.sendMessage(`Text has been added to database✅\nYour ask: ${text1}\n reply: ${text2}`, event.threadID, event.messageID);
    } catch (error) {
        console.error("An error occurred:", error);
        api.sendMessage("eg hi | bye", event.threadID, event.messageID);
    }
};
 