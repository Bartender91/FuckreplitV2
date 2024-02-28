module.exports = {
  config: {
    name: "hentaivideo2",
    aliases: ["hvd2"],
    version: "1.0",
    author: "kshitiz",
    countDown: 60,
    role: 2,
    shortDescription: "get hentai video",
    longDescription: "it will send hentai  video",
    category: "18+",
    guide: "{p}{n}hvdo",
  },

  sentVideos: [],

  onStart: async function ({ api, event, message }) {
    const senderID = event.senderID;

    const loadingMessage = await message.reply({
      body: "Loading random hentai... Please wait! upto 5min 🤡",
    });


    const link = [
        "https://drive.google.com/uc?export=download&id=13JfyhkaYSWA4AAWr42xaIz6L98s_e9D0",
        "https://drive.google.com/uc?export=download&id=14u-vyWWOEv1loyVCowEexuhhQpdC3_so",
        "https://drive.google.com/uc?export=download&id=1ebKxvEN-YsUOvbEL74YoZsurk6LPtuyQ",
        "https://drive.google.com/uc?export=download&id=1ylLDOrMABnyW62wShb94gDedQPIEuINf",
        "https://drive.google.com/uc?export=download&id=1vywgLwGyKXgTihmQkoZqyIOpfmvNuJjq",
        "https://drive.google.com/uc?export=download&id=1yHLWFf8XelHIJsXaTOM1nGCOevrPhihz",
        "https://drive.google.com/uc?export=download&id=1jeFGlxfvcIgTOZavMgu6SUMpjYUC5bHX",
        "https://drive.google.com/uc?export=download&id=1F3tuYMd47MeFC485to9ke9RCBRlYqqKW",
        "https://drive.google.com/uc?export=download&id=1gGXFUUFxHeh88-6RTRs7n6HIAy4wfDzy",
        "https://drive.google.com/uc?export=download&id=1c3zTTPHkZEjAvg1XSWfbz6zN67dWM5Up",
        "https://drive.google.com/uc?export=download&id=1e9JQWbOnfRpwzU69TcapxRcwzz7WJfjK",
        "https://drive.google.com/uc?export=download&id=1R-9xAxkXSFm8xD-r5zFbv84OSP3VHraR",
        "https://drive.google.com/uc?export=download&id=1jJSW4qtjS6FVPEwfyRA-UWw2W_fRdn_F",
        "https://drive.google.com/uc?export=download&id=1i0j5r9A3X8BH7hr2GCTllP541AIrBv94",
        "https://drive.google.com/uc?export=download&id=1g-14gWed1WmeFlN8wmTfIXTre6yDt181",
        "https://drive.google.com/uc?export=download&id=1d71npr-86O9Yzcf8wlmRHuSQl2Hpqt8P",
        "https://drive.google.com/uc?export=download&id=1SwYzBsszTxMHrEOn_obgAF0Up4_zrn1i",
        "https://drive.google.com/uc?export=download&id=15qxvh_IF69unKC-7ZG2-fYtRBohaeR5S",
        "https://drive.google.com/uc?export=download&id=1uo204W-IbiUy1KH6ox0s1l_4SSjdhipv",
        "https://drive.google.com/uc?export=download&id=1IIEEZ6a3ID-R5SZYF7i9qlqmfpkFtLpk",
        "https://drive.google.com/uc?export=download&id=1-BE2wuI1lEPkQ7cfhG03WIwy5apEvXDt",
        "https://drive.google.com/uc?export=download&id=1MS7YH7-iMgVsTVzPT_KWbBe_p1LmUyoC",
        "https://drive.google.com/uc?export=download&id=1Uju5r3bNqQgyQX2A5Ly8H3Og1dv0Fwfy",
        "https://drive.google.com/uc?export=download&id=194xJ_Zf-XYxmnK-A3mYUf8PxMgZkv33Q",
        "https://drive.google.com/uc?export=download&id=1i7H9NiNppvWqKiRe6feRQTX9_kps5PZ_",
        "https://drive.google.com/uc?export=download&id=1LzbTrBqA-rgIEb-25skObyjwvK38h5Cn",
        "https://drive.google.com/uc?export=download&id=1Hf3TryVlEp6KJW57gmV3sSiptvX7i78f",
        "https://drive.google.com/uc?export=download&id=1yMwf3axsbDD8Z54QHfrfWpCZp5Yp8RLm",
        "https://drive.google.com/uc?export=download&id=1XN87wLJWZynd-hS9Sc2cY1l9QM4ObbHA",
        "https://drive.google.com/uc?export=download&id=1TxxNPycErkp-Dyzb4UFLFHTHmkDLgkXW",
        "https://drive.google.com/uc?export=download&id=1vKk1ZFfP-vmWO_o4FaWM8El2TFyF2NNm",
        "https://drive.google.com/uc?export=download&id=1Xbv6uKA73X4gPTKTC9f7J1s1G28UyTSi",
        "https://drive.google.com/uc?export=download&id=1AABt72JgpDf340ugH8XiHPpANUYviGHw",
        "https://drive.google.com/uc?export=download&id=1oEl9nu33eykgE1fAeXvoRjpIzW1OLW-Y",
        "https://drive.google.com/uc?export=download&id=1sZ26wLyy608V9ccwjbyJOezS93HIWA6c",
        "https://drive.google.com/uc?export=download&id=1CWLIU9uQHVMNaDoAAHDGwtRaJ2lK4VQK",
        "https://drive.google.com/uc?export=download&id=1Xam_IDqb7pAQ6ZfFNzEog7v8XGPZQ5YN",
        "https://drive.google.com/uc?export=download&id=1HqHbc2eKFR_vN_2FFtFZ5P1ad_NX3YHX",
        "https://drive.google.com/uc?export=download&id=1Yz7ixsPHs_a0ptuOlG3iZBFG5WY9kwTo",
        "https://drive.google.com/uc?export=download&id=1CQALKc4CWt31q_GAGgWFeDJkBDgB6dS7",
        "https://drive.google.com/uc?export=download&id=1wayOCPT4s1Tswbi85UIPCZ5jen37sJ3c",
        "https://drive.google.com/uc?export=download&id=1HAHy8NKhJrnI3xDAvP3gqOj75nJzZxZb",
        "https://drive.google.com/uc?export=download&id=19mmSJ-a4IDyJqi9B-JvyXht0q8czf6Ai",
        "https://drive.google.com/uc?export=download&id=1ka1vtRpoX2bPS7HJVWNzZ7_sYrc-BQpv",
        "https://drive.google.com/uc?export=download&id=1_1yEwJOwJrdluG4BHsHFdYHDMwKKDEGq",
        "https://drive.google.com/uc?export=download&id=1nufkQiEmqSLNvlu0ePDCcDxYzsjqeE4a",
        "https://drive.google.com/uc?export=download&id=1avG9ZjoFKC5DLLoqfm1-BJcL76JwBqUJ",
        "https://drive.google.com/uc?export=download&id=1y3HN6O80ZlLUJaSAeHJmEl-CnFkliyvZ",
        "https://drive.google.com/uc?export=download&id=1aRd1hLf5R-zQyL90TiobY_Xj0oG9AeRs",
        "https://drive.google.com/uc?export=download&id=1Ro4TdfAjK1egwlTq_vKroPNZeCxcyrVu",
        "https://drive.google.com/uc?export=download&id=14Wrj0oObkAtqWBLjhDrKa7srRAOzGWnm",
        "https://drive.google.com/uc?export=download&id=14nNofNuVjGp9g9GowM-958x00XsYU6aF",
        "https://drive.google.com/uc?export=download&id=1y7QLKlbehRLlsQbRS-5aPpGOYlbkbSK_",
        "https://drive.google.com/uc?export=download&id=1TE6oYsIGLtpZqnl0aYXSY4ge756QfVxH",
        "https://drive.google.com/uc?export=download&id=10rNTzzquBCEsvFxFw5UCJQAy7-gQLpge",
        "https://drive.google.com/uc?export=download&id=1CrQwsXF7Czch5m8xBYXt_u48Ms_TOciV",
        "https://drive.google.com/uc?export=download&id=1wkxmMn1uVRZavmwhBnvGKXf9Q5Q9M4tR",
        "https://drive.google.com/uc?export=download&id=1S_ngStrvdz6umwuawQyuHfb5dBO1Khxa",
        "https://drive.google.com/uc?export=download&id=1V2OEoljQ9_CthZCWBSM0KgJvDBZ1HF4E",
        "https://drive.google.com/uc?export=download&id=1R_Fp4JkA6sLjhV-6wem7MHXgyO7gpJGj",
        "https://drive.google.com/uc?export=download&id=1B8bOilCU3j4_LCTDcP614H5pHwA-3gvr",
       
    ];

      const availableVideos = link.filter(video => !this.sentVideos.includes(video));

         if (availableVideos.length === 0) {
           this.sentVideos = [];
         }

         const randomIndex = Math.floor(Math.random() * availableVideos.length);
         const randomVideo = availableVideos[randomIndex];

         this.sentVideos.push(randomVideo);

         if (senderID !== null) {
           message.reply({
             body: 'Make sure to watch full video🥵',
             attachment: await global.utils.getStreamFromURL(randomVideo),
           });

           setTimeout(() => {
             api.unsendMessage(loadingMessage.messageID);
           }, 5000);
         }
       },
     };