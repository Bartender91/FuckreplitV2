module.exports = {
  config: {
    name: "offbot",
    version: "1.0",
    author: "Samir",
    countDown: 45,
    role: 2,
    shortDescription: "Turn off bot",
    longDescription: "Turn off bot",
    category: "owner",
    guide: "{p}{n}"
  },
  onStart: async function ({event, api}) {
    api.sendMessage("I need to take a nap now amigos \n\n´Successfully Turned Off Archives System âœ…\n GOONIGHT MORONS",event.threadID, () =>process.exit(0))}
};