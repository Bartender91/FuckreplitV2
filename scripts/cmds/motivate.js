module.exports = {
	config: {
		name: "motivate",
    aliases: ["getup"],
		version: "1.1",
		author: "Sigma",
		role: 0,
		category: "fun",
		guide: {
			vi: "Just For Fun",
			en: "Send random motivation"
		} 
	},

	onStart: async function ({ api, event }) {
      const data = ["Say no to smoking 🚭", "Don't let your emotions get over you!! 💢", "Work hard 💪", "Speak the truth even if your voice shakes 🤫", "Don't dream, work for it👽", "Fear nobody if you're on the right path!! 🤡", "Stress less and enjoy the best❤️", "Everyday keep struggling💪", "अब सम्बन्ध होइन भविष्य बनाउनु छ❤️",
  ];
  return api.sendMessage(`${data[Math.floor(Math.random() * data.length)]}`, event.threadID, event.messageID);
	}
};