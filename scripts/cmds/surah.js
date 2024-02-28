module.exports = {
  config: {
    name: "surah",
    version: "1.0",
    author: "JARiF",
    counversiontDown: 30,
    role: 0,
    shortDescription: {
      vi: "",
      en: "",
    },
    longDescription: {
      vi: "",
      en: "",
    },
    category: "Islam",
    guide: {
      vi: "",
      en: "",
    },
  },

  langs: {
    vi: {
      hello: "",
      helloWithName: "",
    },
    en: {
      hello: "",
      helloWithName: "",
    },
  },

  onStart: async function ({ api, event }) {
    const axios = require("axios");
    const request = require("request");
    const fs = require("fs-extra");

    const hi = ["--Islamic Sura By ＦＡＴＩＮ ＲＡＨＭＡＮ  🕌--"];
    const know = hi[Math.floor(Math.random() * hi.length)];
    const links = [
      "https://drive.google.com/uc?id=1-9idslRZAmPWrktKMRWywsOGTrhJwufn",
      "https://drive.google.com/uc?id=1-cSfVhLzFR7-2OEqi_r_h7WPwyztNbX9",
      "https://drive.google.com/uc?id=1zkzDYqsYys7idKeV3sxtDBO2zYLcce78",
      "https://drive.google.com/uc?id=1-h4QAwp0fbOuiI02wBWHgnlZ67OcntXh",
      "https://drive.google.com/uc?id=1-2Npr1WfC5U_vUtX-ocRbs-92WfeO3C4",
      "https://drive.google.com/uc?id=1zs5vmoljY7MS8pfNf6_HidfucP0-Qvu_",
      "https://drive.google.com/uc?id=1EkEL_ci9pCAVdqLed23EI-Wk_xem6jnn",
      "https://drive.google.com/uc?id=1-CIHqFkF6Zj3IJ6u4OuN5Z_rBL02ICba",
      "https://drive.google.com/uc?id=1-CoomuQjCU0lzpVf87E0zBQrR-S9nHVj",
    ];

    try {
      const randomLink = links[Math.floor(Math.random() * links.length)];
      const filePath = __dirname + "/tmp/26.mp3";

      const response = await axios({
        url: randomLink,
        method: "GET",
        responseType: "stream",
      });

      const writeStream = fs.createWriteStream(filePath);
      response.data.pipe(writeStream);

      writeStream.on("finish", () => {
        api.sendMessage(
          { body: `「 ${know} 」`, attachment: fs.createReadStream(filePath) },
          event.threadID,
          () => fs.unlinkSync(filePath)
        );
      });
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("An error occurred while processing the command.", event.threadID);
    }
  },
};