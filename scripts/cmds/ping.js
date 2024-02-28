module.exports = {
  config: {
    name: "ping",
    Author: "",
    version: "1.0",
    countDown: 60,
    role: 0,
    shortDescription: {
      en: "Pong!"
    },
    longDescription: {
      en: "🏓 check my ping!"
    },
    category: "System",
    guide: {
      en: "{p}ping"
    }
  },
  onStart: async function ({ api, event, args }) {
    const timeStart = Date.now();
    await api.sendMessage("Pong!", event.threadID);
    const ping = Date.now() - timeStart;
    api.sendMessage(`[ ${ping}ms ]`, event.threadID);
  }
};