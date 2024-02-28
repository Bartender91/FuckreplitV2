 module.exports = {
  config: {
    name: "eid1",
    version: "1.0",
    author: "JARiF",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "islam",
    guide: {
      vi: "",
      en: ""
    }
  },

  langs: {
    vi: {
      error: ""
    },
    en: {
      error: ""
    }
  },

  onStart: async ({ api, event }) => {
    const u = Date.parse("June 28, 2023 10:00:00") - Date.parse(new Date());
    const seconds = Math.floor((u / 1000) % 60);
    const minutes = Math.floor((u / 1000 / 60) % 60);
    const hours = Math.floor((u / (1000 * 60 * 60)) % 24);
    const days = Math.floor(u / (1000 * 60 * 60 * 24));

    return api.sendMessage(
      `Time remaining until â¤ ð™€ð™žð™™-ð™ð™¡-ð™ð™žð™©ð™§ ðŸ¥°\ ${days} days ${hours} hours ${minutes} minutes ${seconds} secondsÂ«\?ðšðšŠðš–ðšŠðšðšŠðš— ðšŠðš—ðš ð™´ðš’ðš ðšðšŽðšœðšðš’ðšŸðšŠðš•ðšœ ðšŠðš›ðšŽ ðšðšŽðšðš’ðš—ðš’ðšðšŽðš•ðš¢ ðšðšŽðš™ðšŽðš—ðšðšŽðš—ðš ðš˜ðš— ðš–ðš˜ðš˜ðš— ðšœðš’ðšðš‘ðšðš’ðš—ðš\â€¢.Â¸â™¡ Happy an amazing Eid, filled with joy and prosperity. Wishing you a pleasant and happy Eid. May Allah fulfil all your dreams on this special day!. With divine joy in my heart and a big smile on my face, I am sending you Advance Eid-ul-Fitr wishes. â™¡Â¸.â€¢*\ð—–ð—¼ð—±ð—² ð—•ð˜†:\â‰½ï¼¦ï¼¡ï¼´ï¼©ï¼® ï¼²ï¼¡ï¼¨ï¼­ï¼¡ï¼®â‰¼â‰½`,
      event.threadID,
      event.messageID
    );
  }
};