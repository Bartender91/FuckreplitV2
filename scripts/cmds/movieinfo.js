const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
	config: {
		name: "movieinfo",
		version: "1.2",
		author: "SiAM",
		countDown: 5,
		role: 0,
		category: "Info",
    shortDescription: "get movie's information from IMDb",
    guide: {
      en: "{pn} Movie name" 
    }
    
	},

	onStart: async function ({ api, args, message ,event}) {


    const { getPrefix } = global.utils;
       const p = getPrefix(event.threadID);
    const approvedmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/approved_main.json`));
    const bypassmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/bypass_id.json`));
    const bypassmUid = event.senderID;
    if (bypassmain.includes(bypassmUid)) {
      console.log(`User ${bypassmUid} is in bypass list. Skipping the main approval check.`);
    } else {
      const threadmID = event.threadID;
      if (!approvedmain.includes(threadmID)) {
        const msgSend = message.reply(`cmd 'Animegirl' is locked 🔒...\n Reason : Bot's main cmd \nyou need permission to use all main cmds.\n\nType ${p}requestMain to send a request to admin`);
        setTimeout(async () => {
          message.unsend((await msgSend).messageID);
        }, 40000);
        return;
      }
    }  
      
		const movieName = args.join(" ");
		if (!movieName) return message.reply("Please enter a movie name.");
		try {
			const response = await axios.get(`https://api.popcat.xyz/imdb?q=${movieName}`);
			const movieInfo = response.data;

			const titleText = `Hare is the Information about your input: ${movieName}\n\n🎬----- TITLE-----🎬\nName: ${movieInfo.title}\nDirector: ${movieInfo.director}\nGenres: ${movieInfo.genres}\nRated: ${movieInfo.rated}\nType: ${movieInfo.type}\n\n`;
			const ratingsText = `🌟--- RATINGS ---🌟\nIMDb🌟: ${movieInfo.ratings.find(r => r.source === "Internet Movie Database").value}\nRotten Tomatoes🍅: ${movieInfo.ratings.find(r => r.source === "Rotten Tomatoes").value}\nMetacritic: ${movieInfo.ratings.find(r => r.source === "Metacritic").value}\n\n`;
			const releaseText = `📅--- RELEASE INFO---📅\nRelease date: ${new Date(movieInfo.released).toLocaleDateString()}\nRuntime: ${movieInfo.runtime}\nLanguages🌏: ${movieInfo.languages} and more.\nActors💁: ${movieInfo.actors}\nWriter✍️: ${movieInfo.writer}\nBox Office🎟️: ${movieInfo.boxoffice}\nProduction: ${movieInfo.production}\n\n`;
			const othersText = `🏆----- OTHERS-----🏆\nAwards: ${movieInfo.awards}\nVotes: ${movieInfo.votes}\n\nPlot: ${movieInfo.plot}\n\n`;
			const imdbUrl = `More Info🔗: ${movieInfo.imdburl}`;

			const messageText = `${titleText}${ratingsText}${releaseText}${othersText}${imdbUrl}`;

			const posterUrl = movieInfo.poster;
			if (posterUrl) {
				const response = await axios.get(posterUrl, { responseType: 'arraybuffer' });
				const posterData = Buffer.from(response.data, 'binary');
				const fileName = `${movieInfo.imdbid}.jpg`;
				fs.writeFileSync(fileName, posterData);
				const attachment = fs.createReadStream(fileName);

				// Send the message with the movie info and poster image attachment
				message.reply({
					body: messageText,
					attachment: attachment
				}, () => fs.unlinkSync(fileName));
			} else {
				// Send the message with the movie info only, without the poster image
				message.reply(messageText);
			}
		} catch (error) {
			message.reply("Sorry senpai🥺, Movie info not founded. please change the spelling or movie name...");
		}
	}
};