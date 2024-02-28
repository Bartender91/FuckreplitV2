module.exports = {
  config: {
    name: "beshy",
    aliases: ["beshify"],
    version: 1.0,
    author: "LiANE",
    shortDescription: { en: "Beshify your text" },
    longDescription: { en: "Beshify your text" },
    category: "Utility",
    guide: { en: "{prefix}replace <text> - Replace spaces with 🤸" }
  },
  onStart: async function({ api, event, args, message }) {
    const text = args.join(" ").replace(/ /g, "🤸");
    const reply = `🤸 𝗕𝗲𝘀𝗵𝗶𝗳𝘆:

${text}`;
    message.reply(reply);
  }
};