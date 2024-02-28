const axios = require('axios');

module.exports = {
  config: {
    name: "reminder",
    version: "1.0",
    author: "Cruizex",
    role: 0,
    category: "Utility",
    shortDescription: {
      en: "Set a reminder with live updates.",
    },
    longDescription: {
      en: "Set a reminder with live updates until the specified time.",
    },
    guide: {
      en: "{pn} <time> <updateIntervalInMinutes> <text>",
    },
  },

  onStart: async function ({ message, args }) {
    try {
      // Parse input arguments
      const time = args[0]; // Format: HH:MM:SS
      const updateInterval = parseInt(args[1]); // in minutes
      const reminderText = args.slice(2).join(' ');

      // Validate input
      if (!time || isNaN(updateInterval) || updateInterval <= 0 || !reminderText) {
        message.reply("Invalid command format. Please use: `{pn} <time> <updateIntervalInMinutes> <text>`");
        return;
      }

      // Calculate total time in seconds
      const [hours, minutes, seconds] = time.split(':').map(Number);
      const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

      // Send initial response
      message.reply(`Reminder set for ${time} with updates every ${updateInterval} minutes - ${reminderText}`);

      // Send live updates until the reminder time
      let currentTimeInSeconds = 0;
      const reminderInterval = updateInterval * 60; // Convert minutes to seconds

      const updateTimer = setInterval(function (msg) {
        currentTimeInSeconds += updateInterval * 60;
        const remainingTimeInSeconds = totalTimeInSeconds - currentTimeInSeconds;

        if (remainingTimeInSeconds > 0) {
          const remainingTimeFormatted = formatTime(remainingTimeInSeconds);
          msg.send(`Reminder Update: ${remainingTimeFormatted} left - ${reminderText}`);
        } else {
          clearInterval(updateTimer);
          msg.send(`Reminder: Time's up! - ${reminderText}`);
        }
      }, reminderInterval * 1000, message); // Pass the 'message' object explicitly
    } catch (error) {
      console.error("Error setting reminder:", error.message);
      message.reply("Sorry, there was an error while processing your request.");
    }
  },
};

// Helper function to format time in HH:MM:SS
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}