const fs = require('fs');

module.exports = {
  config: {
    name: "waifupull",
    aliases: ["waifu2"],
    version: "2.0",
    author: "EdiNST",
    countDown: 4,
    role: 0,
    shortDescription: "waifu random",
    longDescription: "waifu random",
    category: "games",
    guide: "{pn}"
  },
  onStart: async function ({ event, api, usersData, message }) {
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

    const waifuJson = fs.readFileSync('waifuimg.json', 'utf8');
    const waifuArray = JSON.parse(waifuJson);

    // Generate a random number to select a waifu based on possibility
    const randomNumber = Math.random() * 100;
    let selectedWaifu;

    for (const waifuData of waifuArray) {
      const possibility = parseFloat(waifuData.possibility);
      if (randomNumber < possibility) {
        selectedWaifu = waifuData;
        break;
      }
    }

    if (!selectedWaifu) {
      // If no waifu is selected, fallback to a random one
      selectedWaifu = waifuArray[Math.floor(Math.random() * waifuArray.length)];
    }

    const waifuName = selectedWaifu.waifuname;
    const img = selectedWaifu.link;
    const stars = selectedWaifu.stars;

    // Check if the user already has the same waifu
    const waifuJSON = fs.readFileSync('waifu.json', 'utf8');
    let waifuDataArray = JSON.parse(waifuJSON);

    for (const waifuData of waifuDataArray) {
      if (waifuData.uid === uid && waifuData.waifuName === waifuName) {
        // If the user has the same waifu, reduce their balance to 100
        const senderID = event.senderID;
        const userData = await usersData.get(senderID);
        if (userData.money >= 120) {
          usersData.set(senderID, {
            money: userData.money + 130, // Reduce the balance to 100
            data: userData.data
          });

          message.reply({
            body: `You already have ${waifuName}. Your balance add 130.\nNice waifu: ${userName}\ame your waifu: ${waifuName}\nStars: ${stars}`,
            attachment: await global.utils.getStreamFromURL(img)
          }, event.threadID);
        } else {
          message.reply("Not enough balance to get the waifu.", event.threadID);
        }
        return;
      }
    }

    // If the user doesn't have the same waifu, add it to their collection
    waifuDataArray.push({
      uid: uid,
      name: userName,
      waifuName: waifuName,
      stars: stars,
      link: img
    });
    fs.writeFileSync('waifu.json', JSON.stringify(waifuDataArray), 'utf8');

    // Deduct the cost of getting the waifu
    const senderID = event.senderID;
    const userData = await usersData.get(senderID);
    if (userData.money >= 250) {
      usersData.set(senderID, {
        money: userData.money - 250,
        data: userData.data
      });

      message.reply({
        body: `Nice waifu: ${userName}\nName your waifu: ${waifuName}\nStars: ${stars}`,
        attachment: await global.utils.getStreamFromURL(img)
      }, event.threadID);
    } else {
      message.reply("Not enough balance to get the waifu.", event.threadID);
    }
  }
};