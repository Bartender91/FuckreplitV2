module.exports = {
  config: {
    name: "groupinfo",
    version: "1.2",
    author: "loufi",
    countDown: 8,
    role: 2,
    shortDescription: "get information group",
    longDescription: "",
    category: "info",
    guide: {
      en: "{pn} ",
    },
  },

  onStart: async ({ api, event }) => {
    try {
      const threadInfo = await api.getThreadInfo(event.threadID);
      const threadName = threadInfo.threadName || "Unnamed Thread";
      const threadType = threadInfo.isGroup ? "Group" : "Personal Chat";
      const participantCount = threadInfo.participantIDs.length;

      const groupID = threadInfo.isGroup ? `\n  ⦿ Group ID: ${event.threadID}` : "";
      const groupStatus = threadInfo.isGroup
        ? `\n  ⦿ Group Status: ${threadInfo.approvalMode ? "Approval Mode On" : "Approval Mode Off"}${threadInfo.restrictions ? `\n  ⦿ Group Issues: ${threadInfo.restrictions}` : ""}`
        : "";

      const adminIDs = threadInfo.adminIDs || [];
      const nicknames = await Promise.all(threadInfo.participantIDs.map(async (userID) => {
        const userInfo = await api.getUserInfo(userID);
        return `• ${userInfo[userID].name}\n- ${userID}\n`;
      }));

      const infoMessage = `${threadName}'s Information\n\n  ⦿ NAME: ${threadName}\n  ⦿ TYPE: ${threadType}${groupID}${groupStatus}\n  ⦿ MEMBER: ${participantCount}`;

      api.sendMessage(infoMessage, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error fetching thread information:", error);
      api.sendMessage("❎ Error fetching thread information. Please try again later.", event.threadID, event.messageID);
    }
  },
};