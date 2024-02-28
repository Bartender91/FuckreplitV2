const axios = require('axios');

module.exports = {
  config: {
    name: "quiz2",
    aliases: [],
    version: "1.0",
    author: "Kshitiz",
    role: 0,
    shortDescription: "play quiz ",
    longDescription: "play a quiz based on different categories",
    category: "fun",
    guide: {
      en: "{p}quiz category"
    }
  },

  onStart: async function ({ message, args, usersData }) {
    const categories = [
      "artliterature",
      "language",
      "sciencenature",
      "general",
      "fooddrink",
      "peopleplaces",
      "geography",
      "historyholidays",
      "entertainment",
      "toysgames",
      "music",
      "mathematics",
      "religionmythology",
      "sportsleisure"
    ];

    if (args.length === 0) {
      const categoryList = categories.join('\n');
      return message.reply(`please specify categories:\n${categoryList}\nex: quiz music`);
    }

    const category = args[0].toLowerCase();
    if (!categories.includes(category)) {
      return message.reply("Invalid category.\nPlease choose categories.");
    }

    try {
      const quizData = await fetchQuiz(category);
      if (!quizData) {
        return message.reply("Failed to fetch quiz question.Please try again later.");
      }

      const { question } = quizData;

      const sentQuestion = await message.reply(`Category: ${category}\nQuestion: ${question}`);

      global.GoatBot.onReply.set(sentQuestion.messageID, {
        commandName: this.config.name,
        messageID: sentQuestion.messageID,
        author: message.senderID,
        correctAnswer: quizData.answer
      });

      setTimeout(async () => {
        try {
          await message.unsend(sentQuestion.messageID);
        } catch (error) {
          console.error("Error while unsending question:", error);
        }
      }, 20000); 
    } catch (error) {
      console.error("Error fetching quiz question:", error);
      return message.reply("Failed to fetch quiz question. Please try again later.");
    }
  },

  onReply: async function ({ message, event, Reply, usersData }) {
    const userAnswer = event.body.trim().toLowerCase();
    const correctAnswer = Reply.correctAnswer.toLowerCase();
    const userID = event.senderID; 

    if (userAnswer === correctAnswer) {
     
      await addCoins(userID, 1000, usersData);
      await message.reply("🎉🎊Congratulations! Your answer is correct.\nYou have received 1000 coins.");
    } else {
      await message.reply(`🥺ooops!! Wrong answer.\nThe correct answer was: ${Reply.correctAnswer}`);
    }

    setTimeout(async () => {
      try {
        await message.unsend(event.messageID);
      } catch (error) {
        console.error("Error while unsending message:", error);
      }
    }, 20000); 

    const { commandName, messageID } = Reply;
    if (commandName === this.config.name) {
      try {
        await message.unsend(messageID);
      } catch (error) {
        console.error("Error while unsending question:", error);
      }
    }
  }
};

async function fetchQuiz(category) {
  try {
    const response = await axios.get(`https://quiz-kshitiz.onrender.com/quiz?category=${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz question:", error);
    return null;
  }
}

async function addCoins(userID, amount, usersData) {

  let userData = await usersData.get(userID);
  if (!userData) {
    userData = { money: 0 }; 
  }
  userData.money += amount;
  await usersData.set(userID, userData);
}