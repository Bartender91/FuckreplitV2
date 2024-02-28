const axios = require('axios');

module.exports = {
	config: {
		name: "media",
		aliases: ["download"],
		version: "1.0",
		author: "Xemon",
		countDown: 30,
		role: 0,
		shortDescription: " all videos",
		longDescription: "download Instagram | facebook | tiktok | YouTube | Twitter videos",
		category: "media",
		guide: "{pn} {{<link>}}"
	},

	onStart: async function ({ message, args }) {
		const name = args.join(" ");
		if (!name)
			return message.reply(`Please enter video link`);
		else {
			const BASE_URL = `https://www.nguyenmanh.name.vn/api/igDL?url=${encodeURIComponent(name)}=&apikey=SyryTUZn`;

       await message.reply(" ✅️| Downloading video for you");

      
			try {
				let res = await axios.get(BASE_URL)

      
         let title = res.data.result.title
			
				let img =  res.data.result.video[0].url;

				const form = {
					body: `${title}`
				};
		  if (img)
					form.attachment = await global.utils.getStreamFromURL(img);
				message.reply(form);  
			} catch (e) { message.reply(`🥺 Not Found`).exports
                  console.log(e);
                  }

		}
	}
};