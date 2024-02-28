const axios = require('axios');
const path = require('path');
const fs = require('fs');
const gtts = require('gtts');

async function convertImageToText(imageURL) {
  try {
    const response = await axios.get(`https://bard-ai.arjhilbard.repl.co/api/other/img2text?input=${encodeURIComponent(imageURL)}`);
    return response.data.extractedText;
  } catch (error) {
    console.error("Error converting image to text:", error);
    return null;
  }
}

function formatFont(text) {
  const fontMapping = {
     a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆",
    n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
    A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬",
    N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹",
  };

  let formattedText = "";
  for (const char of text) {
    if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }
  return formattedText;
}

module.exports = {
  config: {
    name: 'bard3',
    version: '1.0',
    author: 'arjhil',
    countDown: 2,
    shortDescription: 'bard ai',
    longDescription: '',
    category: 'ai',
    guide: {
      en: '{pn} ',
    },
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID, type, messageReply } = event;
    let question = '';

    try {
      if (type === 'message_reply' && messageReply.attachments[0]?.type === 'photo') {
        const attachment = messageReply.attachments[0];
        const imageURL = attachment.url;
        question = await convertImageToText(imageURL);

        if (!question) {
          throw new Error('Failed to convert the photo to text. Please try again with a clearer photo.');
        }
      } else {
        question = args.join(' ').trim();

        if (!question) {
          throw new Error('Please provide a question or query');
        }
      }

      api.sendMessage('🔎 Searching for an answer, please wait...', threadID, messageID);

      
    } catch (error) {
      console.error('An error occurred:', error.message);
      api.sendMessage(`❌ ${error.message}`, threadID, messageID);
    }
  },
};