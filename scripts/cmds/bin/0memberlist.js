const axios = require("axios");

module.exports = {
  config: {
    name: "memberlist",
    aliases: ["memberslist", "mbl"],
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: "MemberList",
    longDescription: "MemberList",
    category: "Thread",
    guide: "memberlist {pn}"
  },
  onStart: async function ({ api, event }) {
    try {
      const threadInfo = await api.getThreadInfo(event.threadID);
      const participants = threadInfo.participantIDs;

      let message = `𝗚𝗥𝗢𝗨𝗣 𝗡𝗔𝗠𝗘: ${threadInfo.name}\n𝗚𝗥𝗢𝗨𝗣 𝗜𝗗: ${event.threadID}\n`;
      let page = 1;
      let memberList = '';

      for (const userId of participants) {
        const userProfile = await api.getUserInfo(userId);
        const username = userProfile[userId].name;
        memberList += `𝗨𝗦𝗘𝗥 𝗡𝗔𝗠𝗘: ${username}\n𝗨𝗦𝗘𝗥 𝗜𝗗: ${userId}\n`;

        // Limit each page to 20 members
        if (memberList.split('\n').length - 1 === 20) {
          message += `=== Page ${page} ===\n${memberList}`;
          api.sendMessage(message, event.threadID);
          page++;
          memberList = '';
          message = '';
        }
      }

      // Send the remaining members in the last page
      if (memberList.length > 0) {
        message += `=== Page ${page} ===\n${memberList}`;
      }

      api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
    }
  },
  onChat: async function ({ api, event }) {
    try {
      if (event.body === '!memberlist') {
        const threadInfo = await api.getThreadInfo(event.threadID);
        const participants = threadInfo.participantIDs;

        let message = `𝗚𝗥𝗢𝗨𝗣 𝗡𝗔𝗠𝗘: ${threadInfo.name}\n𝗚𝗥𝗢𝗨𝗣 𝗜𝗗: ${event.threadID}\n`;
        let page = 1;
        let memberList = '';

        for (const userId of participants) {
          const userProfile = await api.getUserInfo(userId);
          const username = userProfile[userId].name;
          memberList += `𝗨𝗦𝗘𝗥 𝗡𝗔𝗠𝗘: ${username}\n𝗨𝗦𝗘𝗥 𝗜𝗗: ${userId}\n`;

          // Limit each page to 20 members
          if (memberList.split('\n').length - 1 === 20) {
            message += `=== Page ${page} ===\n${memberList}`;
            api.sendMessage(message, event.threadID);
            page++;
            memberList = '';
            message = '';
          }
        }

        // Send the remaining members in the last page
        if (memberList.length > 0) {
          message += `=== Page ${page} ===\n${memberList}`;
        }

        api.sendMessage(message, event.threadID);
      }
    } catch (error) {
      console.error(error);
    }
  }
};