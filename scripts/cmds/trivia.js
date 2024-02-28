const axios = require('axios');

module.exports = {
  config: {
    name: "trivia",
    aliases: ["t"],
    version: "1.0",
    author: "Edi",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Get a random trivia question."
    },
    longDescription: {
      en: "Get a random trivia question to test your knowledge."
    },
    category: "Fun",
    guide: {
      en: "Just use the command to get a trivia question."
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const apiUrl = "https://opentdb.com/api.php?amount=1&type=multiple";
      const response = await axios.get(apiUrl);

      if (response.data.results && response.data.results.length > 0) {
        const triviaData = response.data.results[0];
        const question = triviaData.question;
        const correctAnswer = triviaData.correct_answer;
        const incorrectAnswers = triviaData.incorrect_answers;

        // Combine correct and incorrect answers
        const allAnswers = [...incorrectAnswers, correctAnswer];

        // Shuffle the answers
        const shuffledAnswers = shuffleArray(allAnswers);

        // Send the trivia question with shuffled answers
        const questionMessage = `🧠 Trivia Question: ${question}\n`;
        const answerOptions = shuffledAnswers.map((answer, index) => `${String.fromCharCode(65 + index)}. ${answer}`);
        const fullQuestionMessage = questionMessage + answerOptions.join("\n");
        
        // Send the question
        const sentMessage = await api.sendMessage(fullQuestionMessage, event.threadID);

        // Set timeout to check the answer after the countdown
        setTimeout(async () => {
          const updatedMessage = await api.getMessage(sentMessage.messageID);
          if (updatedMessage.body) {
            // Message is still there, so no answer provided, notify the user
            api.sendMessage("⏰ Time's up! You didn't answer the question.", event.threadID);
          }
        }, this.config.countDown * 1000);

        let answered = false; // Flag to track if the user has answered

        // Listen for user's reply
        api.listen(async (err, event) => {
          if (event.body && event.threadID === event.threadID && !answered) {
            const userAnswer = event.body.trim().toUpperCase();

            if (userAnswer === "A" || userAnswer === "B" || userAnswer === "C" || userAnswer === "D") {
              // User provided a valid answer
              const correctIndex = allAnswers.indexOf(correctAnswer);
              const correctLetter = String.fromCharCode(65 + correctIndex);

              if (userAnswer === correctLetter) {
                // User's answer is correct
                api.sendMessage("🎉 Correct! You got it right!", event.threadID);
              } else {
                // User's answer is incorrect
                api.sendMessage(`❌ Wrong answer. The correct answer is: ${correctLetter}. ${correctAnswer}`, event.threadID);
              }

              answered = true; // Set the answered flag to true

              // Delete the question after being answered
              api.unsendMessage(sentMessage.messageID);
            }
          }
        });
      } else {
        api.sendMessage("❌ Unable to fetch trivia question. Please try again later.", event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("❌ An error occurred while fetching the trivia question. Please try again later.", event.threadID);
    }
  }
};

// Function to shuffle an array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}