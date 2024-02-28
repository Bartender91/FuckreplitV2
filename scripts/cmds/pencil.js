const axios = require("axios");

module.exports = {
config: {
		name: "pencil",
    version: "1.0",
		author: "DRG",
		countDown: 5,
		role: 0,
		shortDescription: "Write anything with Through textpro.me",
		longDescription: "Write anything with Through textpro.me",
		category: "text",
		guide: {
      en: "{p}{n} query",
    }
	},

 onStart: async function ({ api, event, args, message }) {
 try { 
 const samir = args.join(' ');
 const response = `https://api.zahwazein.xyz/textpro/sketch?text=${samir}&apikey=zenzkey_92d341a7630e`;

 const form = {
      body: `Here's Your Request.. `
    };
    form.attachment = [];
    form.attachment[0] = await global.utils.getStreamFromURL(response);
    message.reply(form);
 } catch (error) {
 console.error(error);
 message.reply("An error occurred while fetching response");
 }
 }
};