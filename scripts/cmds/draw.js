const axios = require('axios');

const badWords = [];

module.exports = {
  config: {
    name: 'draw',
    version: '1.0',
    author: 'JARiF × Ohio03',
    countDown: 0,
    role: 0,
    longDescription: {
      vi: 'Draw an image based on a prompt using Nax AI model.',
      en: 'Draw an image based on a prompt using Nax AI model.'
    },
    category: 'image',
    guide: {
      en: ' {pn} Your Prompt | Model' +
        '\n──『 Model 』' +
        '\n1. Anime_Meina-V9' +
        '\n2. Anime_Orangemix' +
        '\n3. Anime_Meinamix-V11'
    }
  },

  onStart: async function ({ message, args }) {
    try {
      const info = args.join(' ');
      const [prompt, model] = info.split('|').map(item => item.trim());
      const text = args.join("");

      if (!text) {
        return message.reply("❎ | Please Provide a Prompt");
      }

      if (containsBadWords(prompt)) {
        return message.reply('❎ | NSFW Prompt Detected');
      }

      const apiKey = 'anniejarif';

      const modelParam = model || '1';
      const apiUrl = `https://www.annie-jarif.repl.co/animefy?model=${modelParam}&prompt=${encodeURIComponent(prompt)}&apikey=${apiKey}`;

      await message.reply('Please Wait...⏳');

      const form = {
        body: "Here's Your Drawing 🎨",
      };

      form.attachment = [];
      form.attachment[0] = await global.utils.getStreamFromURL(apiUrl);

      message.reply(form);
    } catch (error) {
      console.error(error);
      await message.reply('❎ | Sorry, API Have Skill Issue');
    }
  }
};

function containsBadWords(prompt) {
  const promptLower = prompt.toLowerCase();
  return badWords.some(badWord => promptLower.includes(badWord));
}