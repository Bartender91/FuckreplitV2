module.exports = {
  config: {
    name: "boxing",
    version: "1.0",
    author: "Morgan F Walker",
    countDown: 5,
    role: 0,
    shortDescription: "Engage in a fight with someone",
    longDescription: "Initiate a fight with kick, slap, punch, or stab.",
    category: "fun",
  },

  onStart: async function ({ event, message, api, usersData, args }) {
    const mention = Object.keys(event.mentions);

    if (mention.length < 1) {
      return message.reply("Please mention someone to start a fight.");
    }

    // Define the available fight moves.
    const fightMoves = ["kick", "slap", "punch", "stab"];

    // Get a random move for the initiator.
    const initiatorMove = fightMoves[Math.floor(Math.random() * fightMoves.length)];

    message.reply(`You initiated a fight with ${mention[0]}. Choose your move: punch, slap, stab, or kick.`);

    // Listen for a reply from the mentioned user with a reduced listen time (70 seconds).
    const response = await api.listen({ threadID: event.threadID, mentions: mention, listenTime: 70 });

    if (!response || !response.body) {
      return message.reply("The opponent did not respond in time. It's a draw!");
    }

    const opponentMove = response.body.toLowerCase();

    // Determine the winner based on the moves.
    let result = "It's a draw!";
    if (initiatorMove === opponentMove) {
      result = "It's a draw!";
    } else if (
      (initiatorMove === "kick" && opponentMove === "slap") ||
      (initiatorMove === "slap" && opponentMove === "punch") ||
      (initiatorMove === "punch" && opponentMove === "stab") ||
      (initiatorMove === "stab" && opponentMove === "kick")
    ) {
      result = `You ${initiatorMove} your opponent with ${opponentMove}. You win!`;
    } else {
      result = `Your opponent ${opponentMove} you with ${initiatorMove}. You lose!`;
    }

    message.reply(`You ${initiatorMove} your opponent, and they ${opponentMove} you. ${result}`);
  },
};