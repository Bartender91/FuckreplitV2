const axios = require('axios');

module.exports = {
  config: {
    name: "aniboy",
    aliases: ["aniboy"],
    version: "1.0",
    author: "Subash",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Lấy hình ảnh ngẫu nhiên",
      en: "Get random anime picture"
    },
    longDescription: {
      vi: "Lấy hình ảnh ngẫu nhiên từ danh sách đã định nghĩa",
      en: "Get random images from the predefined list"
    },
    category: "anime",
    guide: {
      vi: "{pn}",
      en: "{pn}"
    }
  },

  getRandomImage: function () {
    const images = [
      "https://i.imgur.com/x6Cc9n6.jpg",
"https://i.imgur.com/Jmb7V7h.jpg",
"https://i.imgur.com/5trZsRg.jpg",
"https://i.imgur.com/IzwQVwj.jpg",
"https://i.imgur.com/8AOyfUj.jpg",
"https://i.imgur.com/hJGZwyj.jpg",
"https://i.imgur.com/QU1MKQd.jpg",
"https://i.imgur.com/0frgNtL.jpg",
"https://i.imgur.com/6v29Hz8.jpg",
"https://i.imgur.com/RFwkQMI.jpg",
"https://i.imgur.com/5QnAGFH.jpg",
"https://i.imgur.com/G7SGPWI.jpg",
"https://i.imgur.com/NuEQzfl.jpg",
"https://i.imgur.com/zw53mfy.jpg",
"https://i.imgur.com/GjG1tBz.jpg",
"https://i.imgur.com/Mu8Y0vR.jpg",
"https://i.imgur.com/VxEFxz6.jpg",
"https://i.imgur.com/s8lysbe.jpg",
"https://i.imgur.com/UqDJlIu.png",
"https://i.imgur.com/PxiKaff.jpg",
"https://i.imgur.com/SpW8Eq0.jpg",
"https://i.imgur.com/vQ104Wa.jpg",
"https://i.imgur.com/S1vyler.jpg",
"https://i.imgur.com/UvHNwPB.jpg",
"https://i.imgur.com/DKUxCGa.jpg",
      // Add more image URLs as needed
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  },

  onStart: async function ({ message }) {
    try {
      const imageUrl = this.getRandomImage();

      return message.reply({
        attachment: await global.utils.getStreamFromURL(imageUrl)
      });
    } catch (error) {
      console.error("Error while retrieving waifu image:", error);
      return message.reply("An error occurred while processing your request.");
    }
  }
};