module.exports = {
  config: {
    name: "lieDetector",
    aliases: ["ld"],
    shortDescription: {
      en: "Lie detector command",
      tl: "Lie detector command"
    },
    longDescription: {
      en: "A command that detects if the user is lying",
      tl: "Isang command na nakakadetekta kung nagsisinungaling ang user"
    },
    category: "goatBot",
    guide: {
      en: "{p}lieDetector <statement>",
      tl: "{p}lieDetector <pahayag>"
    },
    role: 0,
  },
  onStart: async function ({ event, message }) {
    const statement = event.body.slice(12); // Get the statement from the message
    const liarProbability = Math.random(); // Generate a random probability of being a liar

    if (liarProbability < 0.5) {
      message.reply(`The statement "${statement}" is TRUE. The user is not lying.`);
    } else {
      message.reply(`The statement "${statement}" is FALSE. The user is lying.`);
    }
  },
};