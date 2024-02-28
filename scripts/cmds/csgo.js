const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "csgo",
    alias: "",
    version: "1.0",
    author: "loufi",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "game",
  },

  onStart: async function ({ api, event, Currencies, Users }) {
    const { senderID, threadID, messageID } = event;

    let balance = (await Currencies.getData(senderID)).money;
    if (balance <= 5000)
      return api.sendMessage(
        "Bạn nghèo quá nên không có tiền chơi đâu liuliu",
        threadID,
        messageID
      );

    const tientrochoi = 100; // Assuming tientrochoi should be a constant value
    await Currencies.decreaseMoney(senderID, tientrochoi);

    try {
      const res = await axios.get(
        "https://ginxkin-api.herokuapp.com/api/csgo_quiz/random"
      );
      const pubg = await axios.get(res.data.link, {
        responseType: "arraybuffer",
      });
      fs.writeFileSync(__dirname + "/cache/csgo.png", pubg.data);
      const namePlayer_react = await Users.getData(senderID);

      api.sendMessage(
        {
          body: `🌸====[𝐂𝐒𝐆𝐎 𝐐𝐔𝐈𝐙]====🌸\\${res.data.body}\\𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘃𝗼̛́𝗶 𝗸𝗲̂́𝘓̣̂
`,
          attachment: fs.createReadStream(__dirname + "/cache/csgo.png"),
        },
        threadID,
        async (err, info) => {
          client.handleReply.push({
            type: "random",
            name: this.config.name,
            senderID: senderID,
            messageID: info.messageID,
            replyID: messageID,
            threadID: threadID,
            answer_: res.data.answer,
          });
          await new Promise((resolve) => setTimeout(resolve, 120));
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      api.sendMessage("An error occurred while fetching data.", threadID);
    }
  },

  handleReply: async function ({
    api,
    event,
    handleReply,
    client,
    Users,
    Currencies,
  }) {
    if (event.senderID === api.getCurrentUserID()) return;

    let { senderID, threadID } = event;
    let name = (await Users.getData(senderID)).name;
    var money = parseInt(Math.floor(Math.random() * 5000));

    switch (handleReply.type) {
      case "random": {
        if (event.body.toUpperCase() === handleReply.answer_)
          api.sendMessage(
            { body: `🎆🎆 ${name} you win ${money}$ 😽` },
            handleReply.threadID,
            () =>
              api.unsendMessage(handleReply.messageID) +
              Currencies.increaseMoney(senderID, money)
          );
        else
          api.sendMessage(
            { body: `You need ${handleReply.answer_} use command` },
            handleReply.threadID,
            () => api.unsendMessage(handleReply.messageID)
          );

        handleReply.splice(0, 1);
      }
    }
  },
};