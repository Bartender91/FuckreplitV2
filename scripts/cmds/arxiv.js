const axios = require('axios');
const xml2js = require('xml2js');

module.exports = {
  config: {
    name: "arxiv",
    version: "1.0.2",
    author: "loufi",
    countDown: 5,
    role: 0,
    shortDescription: "search for research",
    longDescription: "",
    category: "ai",
    guide: {
      en: "{pn} ",
    }
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;
    const query = args.join(' ');

    if (!query) {
      api.sendMessage('Please provide a search query for Arxiv.', threadID, messageID);
      return;
    }

    try {
      const response = await axios.get(`http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}`);
      const xmlData = response.data;

      const parser = new xml2js.Parser();
      try {
        const result = await parser.parseStringPromise(xmlData);
        const entries = result.feed.entry;

        if (!entries || entries.length === 0) {
          api.sendMessage('No research articles found on Arxiv for the given query.', threadID, messageID);
          return;
        }

        const article = entries[0];
        const title = article.title ? article.title[0] : 'No Title';
        const summary = article.summary ? article.summary[0] : 'No Summary';
        const authors = article.author.map(author => author.name[0]);
        const published = article.published ? article.published[0] : 'No Date';

        const responseMessage = `📚 Arxiv Research Article\\📝 Title: ${title}\\👥 Authors: ${authors.join(', ')}\\🗓️ Published Date: ${published}\\📖 Summary: ${summary}`;

        api.sendMessage(responseMessage, threadID, messageID);
      } catch (error) {
        api.sendMessage('An error occurred while parsing Arxiv data.', threadID, messageID);
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while fetching Arxiv data.', threadID, messageID);
    }
  }
};