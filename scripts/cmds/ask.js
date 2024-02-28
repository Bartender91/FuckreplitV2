const axios = require('axios');

const Prefixes = [
  'ai',
  'ander',
  'goat',
];

function transformText(text) {
  const replacements = {
    a: "𝘢",
    b: "𝘣",
    c: "𝘤",
    d: "𝘥",
    e: "𝘦",
    f: "𝘧",
    g: "𝘨",
    h: "𝘩",
    i: "𝘪",
    j: "𝘫",
    k: "𝘬",
    l: "𝘭",
    m: "𝘮",
    n: "𝘯",
    o: "𝘰",
    p: "𝘱",
    q: "𝘲", 
    r: "𝘳",
    s: "𝘴",
    t: "𝘵",
    u: "𝘶",
    v: "𝘷",
    w: "𝘸",
    x: "𝘹",
    y: "𝘺",
    z: "𝘻",
  };

  const transformedText = text.toLowerCase().split('').map(char => {
    const replacement = replacements[char];
    return replacement !== undefined ? replacement : char;
  }).join('');

  return transformedText;
}

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "Anderlias",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; 
      }

      const prompt = event.body.substring(prefix.length).trim();
      if (!prompt) {
        await message.reply("✰━━━━━━━━━━━✰\n╭🧠➛𝗔𝗻𝗱𝗲𝗿𝗔𝗶\n•𝘝𝘦𝘶𝘪𝘭𝘭𝘦𝘻 𝘪𝘮𝘱𝘰𝘴𝘦𝘳 𝘷𝘰𝘵𝘳𝘦 𝘥𝘦𝘮𝘢𝘯𝘥𝘦!\n ✰━━━━━━━━━━━✰\n𝗕𝗼𝘁 𝗯𝘆 𝘋𝘦𝘢𝘥𝘭𝘪𝘯𝘦 𝘈𝘯𝘥𝘦𝘳𝘭𝘪𝘢𝘴");
        return;
      }

      const response = await axios.get(`https://sandipapi.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;
      const transformedAnswer = transformText(answer);

      await message.reply(transformedAnswer + "\n✰━━━━━━━━━━━✰\n🧠𝗔𝗻𝗱𝗲𝗿𝗔𝗶\n➛𝖡𝗈𝗍 𝖻𝗒 𝗗𝗲𝗮𝗱𝗹𝗶𝗻𝗲 𝗔𝗻𝗱𝗲𝗿𝗹𝗶𝗮𝘀\n✰━━━━━━━━━━━✰");

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};