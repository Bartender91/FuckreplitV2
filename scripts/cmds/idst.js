module.exports = {
  config: {
    name: "idst",
    version: "1.0.2",
    author: "loufi",
    countDown: 8,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "info",
    guide: {
      en: "{pn} ",
    },
  },

  onStart: async function ({ api, event, args }) {
    if (event.type === "message_reply") {
      const replyAttachment = event.messageReply && event.messageReply.attachments && event.messageReply.attachments[0];

      if (replyAttachment && replyAttachment.type === "sticker") {
        const { ID, description } = replyAttachment;
        const replyMessage = `ID: ${ID}
\Caption: ${description || "No caption"}`;
        return api.sendMessage({ body: replyMessage }, event.threadID);
      } else {
        return api.sendMessage("Only reply with a sticker", event.threadID);
      }
    } else if (args[0]) {
      return api.sendMessage({ sticker: args[0] }, event.threadID);
    } else {
      return api.sendMessage("Please provide a sticker or reply with a sticker", event.threadID);
    }
  },
};