const axios = require("axios");
const allowMirai = false;

module.exports = {
  config: {
    name: "neanmart",
    aliases: ["market", "mart", "nm"],
    shortDescription: {
      en: "View and install items available in the market."
    },
    category: "Market",
    usage: "{p}market [itemID]",
    version: "1.8",
    role: 0,
    author: "LiANE",
  },
  langs: {
    en: {
      loadedSuccess: `〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗
━━━━━━━━━━━━━━━
Command has '%1' been applied successfully!
Loaded using CMD Command.`,
      loadedError: `〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗
━━━━━━━━━━━━━━━
Error during loading: 
%2
Loaded using CMD Command.`
    }
  },
  onStart: async(context) => {
    const { api, event, args, message } = context;
    const serverURL = "https://neanmartpublic.nealianacagara.repl.co";

    try {
      if (args[0] === "install") {
          if (!args[0]) {
      message.reply(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗
━━━━━━━━━━━━━━━
Missing file name! < file name > < item id >`);
      return;
    } else if (!args[1]) {
      message.reply(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗
━━━━━━━━━━━━━━━
Missing item ID! < file name > < item id >`);
      return;
    } if (!args[1].endsWith(".js")) {
      message.reply(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗
━━━━━━━━━━━━━━━
Missing name must end in JS!`);
      return;
    }

    //const axios = require('axios');
    const fs = require('fs');
    const path = require('path');

    const link = serverURL + "/raw/" + args[2];
//https://neanmartv2.bene-edu-ph(.)repl(.)co/raw/
    try {
      const response = await axios.get(link);
      const file = response.data;
      const fileName = args[1].replace(".js", "");

      const filePath = path.join(process.cwd(), 'scripts/cmds', args[1]);
      const directory = path.dirname(filePath);

      // Create the directory if it doesn't exist
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      fs.writeFileSync(filePath, file);
      args[0] = "load";
      args[1] = fileName;
      const CMD = require('./cmd');
      await CMD.onStart(context);
    } catch (error) {
      message.reply(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗
━━━━━━━━━━━━━━━
` + error.message);
    }


      } else if (args[0] === "code") {
        const itemID = args[1];
        const response = await axios.get(`${serverURL}/api/items/${itemID}`, {
          params: {
            itemID: itemID
          }
        });
        const code = response.data.code;
        const codeX = await axios.get(response.data.pastebinLink);
const codeExtracted = codeX.data;

        if (code || codeX ) {
          message.reply(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗
━━━━━━━━━━━━━━━
Item Name: ${response.data.itemName}
Uploaded By: ${response.data.userName}
Item ID: ${response.data.itemID}
Type: ${response.data.type || 'GoatBot' }
Item Code: 
${codeExtracted }`);
        } else {
          api.sendMessage("Item not found.", event.threadID);
        }
      } else if (args[0] === "page") {
        const pageNumber = parseInt(args[1]);
        const response = await axios.get(`${serverURL}/api/items`);
        const items = response.data;
        const totalPages = Math.ceil(items.length / 5);
        const offset = (pageNumber - 1) * 5;

        if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
          api.sendMessage("Invalid page number.", event.threadID);
        } else {
          const pageItems = items.slice(offset, offset + 5);

          const itemDescriptions = pageItems.map(
            (item) =>
              `⩥ ${item.itemName.toUpperCase()}
◉ From: ${item.userName}
◉ Item ID: ${item.itemID}
◉ Description: 
${item.description}
`
          );
          const itemInfo = itemDescriptions.join(`
`);

          message.reply(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗
━━━━━━━━━━━━━━━
Items available in the market:

${itemInfo}

Use ${event.body.split(" ")[0]} [ show | code ] <item id> to view pastebin link or code.

Page: [ ${pageNumber} / ${totalPages} ]`);
        }
      } else if (args[0] === "mirai" && allowMirai === true) {
        const pageNumber = parseInt(args[1]);
        const response = await axios.get(`${serverURL}/api/miraiItems`);
        const items = response.data;
        const totalPages = Math.ceil(items.length / 5);
        const offset = (pageNumber - 1) * 5;

        if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
          api.sendMessage("❌ | Invalid page number.", event.threadID);
        } else {
          const pageItems = items.slice(offset, offset + 5);

          const itemDescriptions = pageItems.map(
            (item) =>
              `📍  | ${item.itemName.toUpperCase()}
👥 | Uploaded By: ${item.userName}
📝 | Item ID: ${item.itemID}
🔊 | Description: 
${item.description}
`
          );
          const itemInfo = itemDescriptions.join(`
`);

          message.reply(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗
━━━━━━━━━━━━━━━
Available Mirai Cmds in the market:

${itemInfo}

Use ${event.body.split(" ")[0]} [ show | code ] <item id> to view pastebin link or code.

Page: [ ${pageNumber} / ${totalPages} ]`);
        }
      } else if (args[0] === "show") {
        const itemID = args[1];
        const response = await axios.get(`${serverURL}/api/items/${itemID}`);
        const item = response.data;

        if (item && itemID) {
          message.reply(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗
━━━━━━━━━━━━━━━
📍 | Item Name: ${item.itemName}
👥 | Uploaded By: ${item.userName}
📝 | Item ID: ${item.itemID}
⌨️ | Type: ${item.type || " GoatBot"}
🔊 | Description: 
${item.description}
🖇️ | Raw Link: Cannot be sent
⚠️ | Use ${event.body.split(" ")[0]} to install.`);
        } else {
          api.sendMessage("Item not found.", event.threadID);
        }
      } else {
        api.sendMessage(`〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗
━━━━━━━━━━━━━━━
Available Choices:
-> ${event.body} page < page number >
-> ${event.body} code < item ID >
-> ${event.body} show < item ID >
-> ${event.body} install < file name > < itemID >`, event.threadID, event.messageID);
        }

    } catch (error) {
      console.error("❌ | Error fetching items:", error);
      api.sendMessage("❌ | Invalid Item ID " + error.message, event.threadID);
    }
  },
};