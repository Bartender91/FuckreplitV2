const { exec } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: 'liveshot',
    aliases: ['scrot'],
    version: '1.0',
    author: 'Cruizex',
    role: 0,
    countDown: 60,
    longDescription: {
      en: 'This command takes a screenshot and sends it as an attachment.',
    },
    category: 'Utility',
    guide: {
      en: '{pn} <optional: delay in seconds>',
    },
  },

  onStart: async function ({ api, event, args }) {
    try {
      let delay = args[0] || 0;

      // Set the DISPLAY environment variable
      process.env.DISPLAY = ':20.0';

      // Take screenshot with scrot
      const outputFileName = path.join(__dirname, 'cache', 'screenshot.png');
      const command = `scrot ${outputFileName} -d ${delay}`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return api.sendMessage('An error occurred.', event.threadID, event.messageID);
        }

        // Send image as an attachment
        const imgData = [fs.createReadStream(outputFileName)];
        api.sendMessage({ attachment: imgData }, event.threadID, event.messageID);

        // Remove local copy
        fs.remove(outputFileName);
      });
    } catch (error) {
      console.error(error);
      return api.sendMessage('An error occurred.', event.threadID, event.messageID);
    }
  },
};