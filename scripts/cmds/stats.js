const fast = require('fast-speedtest-api');

module.exports = {
  config: {
    name: "stats",
    aliases: ["upt"],
    version: "1.5",
    author: "S",
    role: 2,
    shortDescription: {
      en: "Uptime"
    },
    longDescription: {
      en: "Shows uptime, speed and ping functionalities."
    },
    category: "system",
    guide: {
      en: "Use {p}allinone to see combined stats, speed test, and ping."
    }
  },
  onStart: async function ({ api, event, usersData, threadsData }) {
    try {
      // Uptime Calculation
      const uptime = process.uptime();
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      const uptimeString = `${hours}Hrs ${minutes}min ${seconds}sec`;

      // Speed Test
      const speedTest = new fast({
        token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
        verbose: false,
        timeout: 10000,
        https: true,
        urlCount: 5,
        bufferSize: 8,
        unit: fast.UNITS.Mbps
      });

      const speedResult = await speedTest.getSpeed();

      // Ping
      const timeStart = Date.now();
      await api.sendMessage("Voici le résultat! 🤥", event.threadID);
      const ping = Date.now() - timeStart;

      let pingStatus = "Not smooth throw your router, buddy!";
      if (ping < 400) {
        pingStatus = "Smooth like Ferrari!";
      }

      // Total Users and Threads
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();

      // Create combined message
      const combinedMessage =
        `⏰ Uptime\ ⭔ ${uptimeString}\\` +
        `📶 Speed\ ⭔ ${speedResult} MBPS\\` +
        `🛜 Ping\ ⭔ ${ping} MS\\` +
        `👥 Users\ ⭔ ${allUsers.length} users\\` + `🚀 Threads\ ⭔ ${allThreads.length} threads\\`+`🌚 Ping Status ~ ${pingStatus}`;

      api.sendMessage(combinedMessage, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
};