const spy2 = {
  config: {
    name: "spy2",
    version: "1.0",
    author: "Shikaki fix nd modified by Morgan F Walker",
    countDown: 5,
    role: 0,
    shortDescription: "Get user information and avatar",
    longDescription: "Get user information and avatar by mentioning",
    category: "image",
  },

  onStart: async function ({ event, message, usersData, api, args, getLang }) {
    let avt;
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];
    let uid;
    let age;
    let zodiacSign; // New variables for age and zodiac sign

    if (args[0]) {
      // Check if the argument is a numeric UID
      if (/^\d+$/.test(args[0])) {
        uid = args[0];
      } else {
        // Check if the argument is a profile link
        const match = args[0].match(/profile\.php\?id=(\d+)/);
        if (match) {
          uid = match[1];
        }
      }
    }

    if (!uid) {
      // If no UID was extracted from the argument, use the default logic
      uid = event.type === "message_reply" ? event.messageReply.senderID : uid2 || uid1;
    }

    // Prompt the user for additional information
    const mood = "Happy 😄"; // You can change this to ask the user for their mood.
    const musicTaste = "Rock 🎸"; // You can change this to ask the user for their music taste.
    const hobbies = "Playing games 🎮"; // You can change this to ask the user for their hobbies.
    const favoriteFood = "Pizza 🍕"; // You can change this to ask the user for their favorite food.
    const personalities = "Friendly and outgoing 👋"; // You can change this to ask the user for their personality traits.

    api.getUserInfo(uid, async (err, userInfo) => {
      if (err) {
        return message.reply("Failed to retrieve user information.");
      }

      const avatarUrl = await usersData.getAvatarUrl(uid);

      // Gender mapping
      let genderText;
      switch (userInfo[uid].gender) {
        case 1:
          genderText = "Girl👧";
          break;
        case 2:
          genderText = "Boy🎅";
          break;
        default:
          genderText = "Bisexual";
      }

      // Age calculation
      const birthDate = new Date(userInfo[uid].birthday);
      const today = new Date();
      const ageDiff = today - birthDate;
      const ageDate = new Date(ageDiff);
      age = Math.abs(ageDate.getUTCFullYear() - 1970);

      // Zodiac sign calculation
      const birthMonth = birthDate.getMonth() + 1; // Adding 1 because getMonth() returns 0-based index
      const birthDay = birthDate.getDate();
      let zodiacSignText;

      if ((birthMonth === 1 && birthDay >= 20) || (birthMonth === 2 && birthDay <= 18)) {
        zodiacSignText = "Aquarius";
      } else if ((birthMonth === 2 && birthDay >= 19 && birthMonth === 3 && birthDay <= 20)) {
        zodiacSignText = "Pisces";
      } else if ((birthMonth === 3 && birthDay >= 21 && birthMonth === 4 && birthDay <= 19)) {
        zodiacSignText = "Aries";
      } else if ((birthMonth === 4 && birthDay >= 20 && birthMonth === 5 && birthDay <= 20)) {
        zodiacSignText = "Taurus";
      } else if ((birthMonth === 5 && birthDay >= 21 && birthMonth === 6 && birthDay <= 20)) {
        zodiacSignText = "Gemini";
      } else if ((birthMonth === 6 && birthDay >= 21 && birthMonth === 7 && birthDay <= 22)) {
        zodiacSignText = "Cancer";
      } else if ((birthMonth === 7 && birthDay >= 23 && birthMonth === 8 && birthDay <= 22)) {
        zodiacSignText = "Leo";
      } else if ((birthMonth === 8 && birthDay >= 23 && birthMonth === 9 && birthDay <= 22)) {
        zodiacSignText = "Virgo";
      } else if ((birthMonth === 9 && birthDay >= 23 && birthMonth === 10 && birthDay <= 22)) {
        zodiacSignText = "Libra";
      } else if ((birthMonth === 10 && birthDay >= 23 && birthMonth === 11 && birthDay <= 21)) {
        zodiacSignText = "Scorpio";
      } else if ((birthMonth === 11 && birthDay >= 22 && birthMonth === 12 && birthDay <= 21)) {
        zodiacSignText = "Sagittarius";
      } else {
        zodiacSignText = "Capricorn";
      }

      // Construct and send the user's information with avatar
      const userInformation = `❏ Name: ${userInfo[uid].name}\n❏ Profile URL: ${userInfo[uid].profileUrl}\n❏ Gender: ${genderText}\n❏ User Type: ${userInfo[uid].type}\n❏ Is Friend: ${userInfo[uid].isFriend ? "Yes😁" : "No😌"}\n❏ Is Birthday today: ${userInfo[uid].isBirthday ? "Yes" : "No"}\n❏ Age: ${age}\n❏ Zodiac Sign: ${zodiacSignText}\n❏ Mood: ${mood}\n❏ Music Taste: ${musicTaste}\n❏ Hobbies: ${hobbies}\n❏ Favorite Food: ${favoriteFood}\n❏ Personalities: ${personalities}`;

      message.reply({
        body: userInformation,
        attachment: await global.utils.getStreamFromURL(avatarUrl),
      });
    });
  },
};

module.exports = spy2;