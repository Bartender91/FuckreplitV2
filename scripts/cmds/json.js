const fs = require('fs');

module.exports = {
  config: {
    name: 'creajson',
    aliases: ["json"],
    version: '1.0',
    author: 'Riley',
    countDown: 10,
    role: 2, 
    shortDescription: {
      vi: 'Tạo file JSON mới',
      en: 'Create a new JSON file'
    },
    longDescription: {
      vi: 'Tạo một file JSON mới dengan nama yang diberikan oleh pengguna dan objek yang disediakan.',
      en: 'Create a new JSON file with the name provided by the user and the object provided.'
    },
    category: 'Admin',
    guide: {
      vi: '{p}createfile NAMA_File.json { "key": "value" }',
      en: '{p}createfile FILE_NAME.json { "key": "value" }'
    }
  },

  onStart: async function ({ api, args, event }) {
    const fileName = args[0];
    const objectData = args.slice(1).join(' ');

    if (!fileName || !fileName.endsWith('.json') || !objectData) {
      return api.sendMessage('Usage: {p}createfile FILE_NAME.json { "key": "value" }', event.threadID);
    }

    try {
      createNewJSONFile(fileName, objectData);
      return api.sendMessage(`File JSON baru dengan nama ${fileName} dan objek berikut berhasil dibuat:\n${objectData}`, event.threadID);
    } catch (error) {
      console.error(error);
      return api.sendMessage(`Terjadi kesalahan saat mencoba membuat file ${fileName}.`, event.threadID);
    }
  },
};

function createNewJSONFile(fileName, objectData) {
  const filePath = `./${fileName}`;
  
  try {
    
    fs.writeFileSync(filePath, objectData);
  } catch (error) {
    console.error(error);
    throw error;
  }
}