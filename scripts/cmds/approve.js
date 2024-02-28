const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "approve",
    version: "1.0",
    author: "SANDIP",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Approve or remove a specific thread and store its details."
    },
    longDescription: {
      en: "This command allows you to approve or remove a specific thread by providing its ID, and it will be stored or removed from the approved list."
    },
    category: "owner",
    guide: {
      en: "To add a thread: !approve add <threadID>\nTo remove a thread: !approve remove <threadID>"
    }
  },

  onStart: async function({ api, event, args, threadsData }) {
    if (args.length !== 3 || !['add', 'remove'].includes(args[1].toLowerCase())) {
      return api.sendMessage("Invalid command format. Usage:\nTo add a thread: !approve add <threadID>\nTo remove a thread: !approve remove <threadID>", event.threadID);
    }

    const action = args[1].toLowerCase();
    const threadID = args[2];
    const approvedThreadsFile = path.join(__dirname, 'approved.json');

    // Load existing approved thread data from the JSON file
    let approvedThreads = {};
    if (fs.existsSync(approvedThreadsFile)) {
      try {
        const data = fs.readFileSync(approvedThreadsFile, 'utf8');
        if (data) {
          approvedThreads = JSON.parse(data);
        }
      } catch (error) {
        console.error("Error reading approvedThreadsFile:", error);
      }
    }

    if (action === 'add') {
      // Check if the thread exists
      try {
        const threadData = await api.getThreadInfo(threadID);

        // Store thread ID and name in the approvedThreads object
        approvedThreads[threadID] = {
          name: threadData.threadName,
          timestamp: Date.now(),
        };

        // Save updated approvedThreads object back to the JSON file
        try {
          await fs.promises.writeFile(approvedThreadsFile, JSON.stringify(approvedThreads, null, 2), 'utf8');
          api.sendMessage(`Thread "${threadData.threadName}" (ID: ${threadID}) has been approved and stored.`, event.threadID);
        } catch (error) {
          console.error("Error writing approvedThreadsFile:", error);
        }
      } catch (error) {
        // If the thread does not exist, send an error message
        api.sendMessage(`Error: Thread with ID ${threadID} does not exist.`, event.threadID);
      }
    } else if (action === 'remove') {
      // Check if the thread exists in the approved list
      if (approvedThreads[threadID]) {
        const threadName = approvedThreads[threadID].name;

        // Remove the thread from the approvedThreads object
        delete approvedThreads[threadID];

        // Save updated approvedThreads object back to the JSON file
        try {
          await fs.promises.writeFile(approvedThreadsFile, JSON.stringify(approvedThreads, null, 2), 'utf8');
          api.sendMessage(`Thread with ID ${threadID}, Thread Name: ${threadName} has been removed from the approved list.`, event.threadID);
        } catch (error) {
          console.error("Error writing approvedThreadsFile:", error);
        }
      } else {
        api.sendMessage(`Error: Thread with ID ${threadID} is not in the approved list.`, event.threadID);
      }
    }
  }
};