const axios = require('axios');

module.exports = {
    config: {
        name: "define",
        version: "2.2",
        author: "Shikaki",
        countDown: 5,
        role: 0,
        shortDescription: {
            en: "Define a word"
        },
        longDescription: {
            en: "Define a word using DictionaryAPI"
        },
        category: "dictionary",
        guide: {
            en: "{pn} (word)"
        }
    },

    onStart: async function ({ args, message }) {
        // Check if there are enough arguments
        if (args.length < 1) {
            message.reply("Please provide a word to define.");
            return;
        }

        const word = args[0];

        try {
            // Make a request to the DictionaryAPI to get word definitions
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

            if (Array.isArray(response.data) && response.data.length > 0) {
                const entry = response.data[0];

                // Extract and format the definitions
                const definitionsList = [];

                entry.meanings.forEach(meaning => {
                    const { partOfSpeech, definitions, synonyms, antonyms } = meaning;
                    const formattedDefs = definitions.map(def => `• ${def.definition}`).join('\n');
                    
                    // Format synonyms and antonyms separately with extra line breaks
                    const formattedSynonyms = synonyms && synonyms.length > 0 ? `\n\n• Synonyms:\n${synonyms.join(', ')}\n` : '\n\n• Synonyms: None\n';
                    const formattedAntonyms = antonyms && antonyms.length > 0 ? `\n\n• Antonyms:\n${antonyms.join(', ')}\n` : '\n\n• Antonyms: None\n';

                    definitionsList.push(`**${partOfSpeech}**:\n${formattedDefs}${formattedSynonyms}${formattedAntonyms}`);
                });

                // Filter out "undefined" phonetics and format the rest
                const phoneticsList = entry.phonetics
                    .filter(phonetic => phonetic.text && phonetic.text !== "undefined")
                    .map(phonetic => {
                        const { text } = phonetic;
                        return `• **Phonetics:** ${text}`;
                    })
                    .join('\n');

                // Create the reply message with decoration and emojis
                const decoration = '-------------------';
                const replyMessage = `\`\`\`\n${decoration}\n📘 Definition of "${word}": 📘\n${decoration}\n\n${definitionsList.join(`\n${decoration}\n`)}\n\n${decoration}\n${phoneticsList}\n${decoration}\`\`\``;

                // Send the definition as a reply
                message.reply(replyMessage, { mentions: [] }); // Remove mentions to make the message cleaner
            } else {
                // Send a message when no definition is found
                message.reply(`No definition found for "${word}".`);
            }
        } catch (error) {
            console.error("Error fetching word definition:", error);
            // Handle errors by sending an empty message
                          message.reply(`No definition found for "${word}".`);
        }
    }
};