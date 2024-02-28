 module.exports = {
	config: {
		name: "birthday",
    aliases: ['bday/bornday'],
		version: "1.0",
		author: "Kelvin",
		countDown: 5,
		role: 2,
		category: "dates",
		guide: {
			vi: "See Admin's Birthday",
			en: "See Admin's Birthday"
		} 
	},
  
	onStart: async function ({ event, api }) {
		const t = Date.parse("November 27, 2023 00:01:00") - Date.parse(new Date());
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60)) % 24 );
    const days = Math.floor( t/(1000*60*60*24) );

    return api.sendMessage(`» ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds «`, event.threadID, event.messageID);
	}
};