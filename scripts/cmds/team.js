module.exports = {
  config: {
    name: 'team',
    version: '1.0',
    author: 'Denver Crain',
    shortDescription: '',
    category: 'fun',
    guide: '{pn}',
  },
  onStart: async function ({ message }) {
    return message.reply('1. Denver Crain [CEO]\n2. Morgan F Walker [Moderator]\n3. Zein[Assistant CEO]\n4. Samantha Crain[Cashier]\n5. Ava Besway[Moderator]', { files: ['https://i.imgur.com/oOyB6QX.jpg'] });
  }
};