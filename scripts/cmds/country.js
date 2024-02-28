axios = require('axios');

module.exports = {
  config: {
    name: "country",
    aliases: ['flag'],
    version: "1.0",
    author: "Samir B. Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Guess the country"
    },
    longDescription: {
      en: "Guess the country name by its flag"
    },
    category: "game",
    guide: {
      en: "{pn}"
    },
  },

  onReply: async function ({ args, event, api, Reply, commandName, usersData }) {
    const { dataGame, country, nameUser } = Reply;
    if (event.senderID !== Reply.author) return;

    switch (Reply.type) {
      case "reply": {
        const userReply = event.body.toLowerCase();
        if (userReply === country.toLowerCase()) {
          api.unsendMessage(Reply.messageID).catch(console.error);
          const rewardCoins = 800;
          const rewardExp = 50; 
          const senderID = event.senderID;
          const userData = await usersData.get(senderID);
          await usersData.set(senderID, {
            money: userData.money + rewardCoins,
            exp: userData.exp + rewardExp,
            data: userData.data
          });

          const msg = {
            body: `✅ ${nameUser}, You've answered correctly!\Answer: ${country}\You've received ${rewardCoins} coins and ${rewardExp} exp as a reward!`
          };
          return api.sendMessage(msg, event.threadID, event.messageID);
        } else {
          api.unsendMessage(Reply.messageID).catch(console.error);
          const msg = `${nameUser}, The answer is wrong!!\orrect answer is: ${country}`;
          return api.sendMessage(msg, event.threadID);
        }
      }
    }
  },

  onStart: async function ({ api, event, usersData, commandName }) {
    const { threadID, messageID } = event;
    const timeout = 60;

    try {
      const response = await axios.get('https://samirthakuri.restfulapi.repl.co/country?apikey=samirey');
      const ansData = response.data;
      const { link, country } = ansData;
      const namePlayerReact = await usersData.getName(event.senderID);

      const msg = {
        body: `What's the name of the country as shown in the flag picture?`,
        attachment: await global.utils.getStreamFromURL(link)
      };

      api.sendMessage(msg, threadID, async (error, info) => {
        if (error) {
          console.error("Error sending message:", error);
          return;
        }

        global.GoatBot.onReply.set(info.messageID, {
          type: "reply",
          commandName,
          author: event.senderID,
          messageID: info.messageID,
          dataGame: ansData,
          country,
          nameUser: namePlayerReact
        });

        setTimeout(function () {
          api.unsendMessage(info.messageID).catch(console.error);
        }, timeout * 1000);
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
};