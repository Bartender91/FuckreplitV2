const mathSansBold = {
A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥",
S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭", a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢",
j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫",
s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳", 0: "𝟎",
1: "𝟏", 2: "𝟐", 3: "𝟑", 4: "𝟒", 5: "𝟓", 6: "𝟔", 7: "𝟕", 8: "𝟖", 9: "𝟗"
};

module.exports = {
config: {
  name: "clear",
  author:"Kshitiz/zed",// Convert By Goatbot Zed
   role: 2,
  shortDescription: " ",
  longDescription: "",
  category: "Tools 🛠️",
  guide: "{pn}"
},

onStart: async function ({ api, event, args, threadsData, message }) {
const { threadID, messageID, body } = event;
var num = args[0];

  if (!num || !parseInt(num)) return api.sendMessage('Your choice must be a number.', threadID, messageID);

  const botMessages = await api.getThreadHistory(threadID, parseInt(num));
  const botSentMessages = botMessages.filter(message => message.senderID); //If Error global.data.botID => api.getCurrentUserID()
var numtn = `${botSentMessages.length}`;
const todam = body.split("").map(c => mathSansBold[c] || c).join("");
const todam2 = numtn.split("").map(c => mathSansBold[c] || c).join("");
const todam3 = num.split("").map(c => mathSansBold[c] || c).join("");
if (botSentMessages.length == 0) return api.sendMessage(`Bot messages not found. In the word search range 「${todam} arrive ${todam3}.`, threadID, messageID);
api.sendMessage(`${todam2} bot message found. Search from message\n「 ${todam} to ${todam3} 」.\n Proceed to unsend after 10 seconds...`, threadID, messageID);

const unsendBotMessages = async () => {
  for (const message of botSentMessages) {
    await api.unsendMessage(message.messageID);
  }
};

setTimeout(async () => {
await unsendBotMessages();
}, 10000); // 30s
},
};