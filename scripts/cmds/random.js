module.exports = {
  config: {
    name: "random",
    aliases: ["rnd","rand"],
    version: "1.1",
    author: "Riley",
    countDown: 3,
    role: 0,
    longDescription: "Memilih random kata dari daftar yang diberikan",
    category: "Miscellaneous",
    guide: {
      en: "{p}random <kata1>, <kata2>, ...",
    },
  },
  onStart: async function ({ message, args }) {
    if (args.length < 2) {
      return message.reply("Minimal 2 kata yang harus diberikan, contoh: !random apel, semangka");
    }

    const kataKata = args.join(" ").split(",");
    const pilihan = kataKata[Math.floor(Math.random() * kataKata.length)];

    return message.reply(`Ethan prefers ${pilihan.toUpperCase()}.`);
  },
};