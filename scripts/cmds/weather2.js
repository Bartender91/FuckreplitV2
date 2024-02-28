const axios = require("axios");
const fs = require("fs-extra");



module.exports = {
  config: {
    name: "weather2",
    version: "1.1",
    author: "SiAM",
    countDown: 5,
    role: 0,
    category: "Weather"
  },


    async onStart({ api, args, event }) {


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
        const msgSend = message.reply(`cmd 'weather' is locked 🔒...\n Reason : Bot's main cmd \nyou need permission to use all main cmds.\n\nType ${p}requestMain to send a request to admin`);
        setTimeout(async () => {
          message.unsend((await msgSend).messageID);
        }, 40000);
        return;
      }
    }  
      
  try {
    const location = encodeURIComponent(args.join(" "));
    const apiKeys = require('./assist_json/api_keys.json').api_keys;
const randomApiKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];
const API_KEY = randomApiKey;
console.log(`Using API key: ${API_KEY}`);
    
    const locationResponse = await axios.get(`http://dataservice.accuweather.com/locations/v1/search?q=${location}&apikey=${API_KEY}`);
    const locationKey = locationResponse.data[0].Key;
    const cityName = locationResponse.data[0].LocalizedName;
    const countryName = locationResponse.data[0].Country.LocalizedName;

    const weatherResponse = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${API_KEY}&details=true&metric=true`);
    const weatherData = weatherResponse.data;

    const date = new Date().toLocaleDateString("en-US", { timeZone: "Asia/Dhaka" });
    

    const currentTempResponse = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`);
    const currentTemp = currentTempResponse.data[0].Temperature.Metric.Value;

    const weatherInfo = {
      headline: weatherData.Headline.Text,
      day: weatherData.DailyForecasts[0].Day.ShortPhrase,
      night: weatherData.DailyForecasts[0].Night.LongPhrase,
      tempHigh: `${weatherData.DailyForecasts[0].Temperature.Maximum.Value}°C`,
      tempLow: `${weatherData.DailyForecasts[0].Temperature.Minimum.Value}°C`,
      
      tempCurrent: `${currentTemp}°C`,
      wind: `${weatherData.DailyForecasts[0].Day.Wind.Direction.Localized} ${weatherData.DailyForecasts[0].Day.Wind.Speed.Value} km/h`,
      cloud: `${weatherData.DailyForecasts[0].Day.CloudCover}%`,
      rain: `${weatherData.DailyForecasts[0].Day.RainProbability}%`,
      rainnight: `${weatherData.DailyForecasts[0].Night.RainProbability}%`,
      sunrise: new Date(weatherData.DailyForecasts[0].Sun.Rise).toLocaleTimeString("en-US", { timeZone: "Asia/Dhaka" }),
      sunset: new Date(weatherData.DailyForecasts[0].Sun.Set).toLocaleTimeString("en-US", { timeZone: "Asia/Dhaka" })
    };

    const messageText = `Location🌍: ${cityName},${countryName}
    
DATE🗓️: ${date}
TEMPERATURE🌡️:
Current: ${weatherInfo.tempCurrent}
Highest: ${weatherInfo.tempHigh}
Lowest: ${weatherInfo.tempLow}

RAIN POSSIBILITY🌧️
Day:${weatherInfo.rain} , Night:${weatherInfo.rainnight}

OTHER:
Wind🌬️: ${weatherInfo.wind}
Cloud☁️: ${weatherInfo.cloud}
Sunrise🌅: ${weatherInfo.sunrise}
Sunset🌇: ${weatherInfo.sunset}

DESCRIPTION:
Day⛅: ${weatherInfo.day}
Night 🌃: ${weatherInfo.night}

Summary:
${weatherInfo.headline}

Request Time: ${date} at ${new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Dhaka" })}

information from AccuWeather 
Created by SiAM`;
    
    api.sendMessage(messageText, event.threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage(("Location not founded, use different name or check your spelling and try again"), event.threadID);
  }
    }
  
  };