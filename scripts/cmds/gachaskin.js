const fs = require('fs');

module.exports = {
  config: {
    name: "gachaskin",
    aliases: ["ml"],
    version: "2.0",
    author: "loufy",
    countDown: 15,
    role: 0,
    shortDescription: "skin gacha",
    longDescription: "gacha skin",
    category: "game",
    guide: "{pn}"
  },
  onStart: async function ({ event, api, usersData }) {
    const uid = event.senderID;
    let userName;

    try {
      const profileInfo = await api.getUserInfo(uid);
      const userData = profileInfo[uid];
      userName = userData.name;
    } catch (error) {
      console.error('Error fetching profile info:', error);
      userName = 'Unknown User';
    }

    const waifuimgJson = fs.readFileSync('waifu.json', 'utf8');
    const waifuArray = JSON.parse(waifuimgJson);
    const waifuData = waifuArray[Math.floor(Math.random() * waifuArray.length)];
    const waifuName = waifuData.waifuname;
    const img = waifuData.link;
    const stars = waifuData.stars;

    // Save data to waifuimg.json
    const waifuJSON = fs.readFileSync('waifuimg.json', 'utf8');
    let waifuDataArray = JSON.parse(waifuimgJSON);
    waifuDataArray.push({
      uid: uid,
      name: userName,
      waifuName: waifuName,
      link: img
    });
    fs.writeFileSync('waifuimg.json', JSON.stringify(waifuimgDataArray), 'utf8');

    const senderID = event.senderID;
    const userData = await usersData.get(senderID);
    const userMoney = await usersData.get(senderID, "money");
    if (userMoney < 12000) {
      return api.sendMessage("You need 12000 money to gacha", event.threadID);
    } else {
      usersData.set(senderID, {
        money: userData.money - 12000,
        data: userData.data
      });

      api.sendMessage({
        body: `Congratulations users: ${userName}\Skin: ${waifuName}`,
        attachment: await global.utils.getStreamFromURL(img)
      }, event.threadID);
    }
  }
};