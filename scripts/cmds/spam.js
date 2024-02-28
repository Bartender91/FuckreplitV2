module.exports = {
  config: {
    name: 'spam',
    aliases: ['Spam'],
    version: '1.0',
    author: 'Eugene Aguilar',
    countDown: 2,
    role: 2,
    shortDescription: 'spam a message multiple times',
    longDescription: 'Spam a message multiple times',
    category: 'fun',
    guide: '{pn}',
  },

onStart: async function ({ api, event, args }) {
   
	const amount = parseInt(args[0]);
	const message = args.slice(1).join(" ");

	if (isNaN(amount) || !message) {
		return api.sendMessage(`Invalid usage. Usage: /spam [amount] [message]`, event.threadID);
	}

	for (let i = 0; i < amount; i++) {
		api.sendMessage(message, event.threadID);
	}
},
	};