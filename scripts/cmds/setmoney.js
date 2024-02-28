module.exports = {
  config: {
    name: "setexp",
    aliases: ["exp"],
    version: "1.0",
    author: "langit",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Set user's exp amount"
    },
    longDescription: {
      en: "Set the exp amount for a user"
    },
    category: "Admin",
    guide: {
      en: "{pn} <exp> [<userID>]"
    }
  },

  langs: {
    en: {
      success: "Successfully set exp amount for user '%1' (ID: %2)",
      noUidProvided: "No userID provided. Setting exp amount for the command sender."
    }
  },

  onStart: async function ({ api, args, message, event, usersData, getLang }) {
    const exp = args[0];
    let uid = args[1];

    if (!uid) {
      uid = event.senderID;
      message.reply(getLang("noUidProvided"));
    }

    const userinfo = await api.getUserInfo([uid]);
    const user = userinfo[uid];
    const name = user.name;

    usersData.set(uid, {
      exp: exp,
      data: usersData.data
    });

    message.reply(getLang("success", name, uid));
  }
};