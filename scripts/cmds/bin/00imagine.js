const axios = require('axios');
module.exports = {
 config: {
 name: "imagine",
 aliases: ["gen"],
 version: "1.1",
 author: "JARiF × Ohio03",
 countDown: 1,
 role: 0,
 shortDescription: {
 en: 'Text to Image'
 },
 longDescription: {
 en: "Text to image"
 },
 category: "image-anime",
 guide: {
 en: ' {pn} Your Prompt | Model' +
 '\『 Model 』\: Analog-diffusion-1.0\: Anythingv3_0\: Anything-v4.5\: Anything-V5\: AOM3A3_Orangemix\: Deliberate_v2\: Dreamlike-diffusion-1.0\: Dreamlike-diffusion-2.0\: Dreamshaper_5BakedVae\: Dreamshaper_6BakedVae\: Dreamshaper_7\: Elldreths-vivid-mix\: Lyriel_v15\: Lyriel_v16\: Mechamix_v10\: Meinamix_meinaV9\: Openjourney_V4\: Portrait+1.0\: PortraitPlus_V1.0\: Realistic_Vision_V1.4\: Realistic_Vision_V2.0\: Realistic_Vision_V4.0\: RevAnimated_v122\: Riffusion-Model-V1\: Sdv1_4\: V1-5\: ShoninsBeautiful_v10\: Theallys-mix-ii\: Timeless-1.0\: EimisAnimeDiffusion_V1\: Meinamix_v11'

 
 }
 },

 onStart: async function({ message, args }) {
 const text = args.join(" ");
 if (!text) {
 return message.reply("❌ | Please Provide a Prompt");
 }

 let prompt, model;
 if (text.includes("|")) {
 const [promptText, modelText] = text.split("|").map((str) => str.trim());
 prompt = promptText;
 model = modelText;
 } else {
 prompt = text;
 model = 20; // Set the default model number to 1
 }

 message.reply("Generating image, please wait...⏳").then((info) => { id = info.messageID });
 try {
 const API = `https://aliestercrowley.com/api/crowgen.php?model=${model}&prompt=${encodeURIComponent(prompt)}=${prompt}`;
 const imageStream = await global.utils.getStreamFromURL(API);

 return message.reply({
 attachment: imageStream
 });
 } catch (error) {
 console.log(error);
 message.reply("Failed to generate your imagination !!").then(() => {
 message.delete(id);
 });
 }
 }
};