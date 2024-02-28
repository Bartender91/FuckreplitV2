const axios = require('axios');

module.exports = {
    config: {
        name: "imagine4",
        version: "1.0",
        author: "Samir Œ",
        countDown: 5,
        role: 0,
        shortDescription: {
            vi: "Generate image with text",
            en: "Generate image with text"
        },
        longDescription: {
            vi: "Generate image with text using a specified model",
            en: "Generate image with text using a specified model"
        },
        category: "image",
        guide: {
        
            en: `{pn} prompt | model | ratio\n\nModels:\n\n

           supported models:
          │1 | 3Guofeng3_v34
          │2 | absolutereality_V16
          │3 |absolutereality_v181
          │4 | amIReal_V41
          │5 | analog-diffusion1.0
          │6 | anythingv3
          │7 | anything-v4.5
          │8 | anythingV5
          │9 | AOM3A3_orangemixs
          │10 | blazing_drive_v10
          │11 | cetusMix_V35
          │12 |childrensStories_v
          │13 |childrensStories_v
          │14 | childv1ToonAnime
          │15 | Counterfeit_v30
          │16 |cuteyuAdorable_mid
          │17 | cyberrealistic_v33
          │18 | dalcefo_v4
          │19 | deliberate_v2
          │20 | deliberate_v3
          │21 | dreamlike-anime-1
          │22 | dreamlike-diffus-1
          │23 | dreaml-photoreal-
          │24 | dreamshaper_6
          │25 | dreamshaper_7
          │26 | dreamshaper_8
          │27 | edgeOfRealism_eo
          │28 | EimisAnimeDiffusi
          │29 | elldreths-vivid-m
          │30 | epicrealism_natAE
          │31 | ICantBelieveItsNot
          │32 | juggernaut_afte
          │33 | lofi_v4
          │34 | lyriel_v16
          │35 | majicmixRealisti
          │36 | mechamix_v10
          │37 | meinamix_meinaV9
          │38 | meinamix_meinaV11
          │39 | neverendingDream_
          │40 | openjourney_V4
          │41 | pastelMixStylize
          │42 | portraitplus_V1.0
          │43 | protogenx34
          │44 | Realistic_Vision_
          │45 | Realistic_V_V2.0
          │46 | Realistic_n_V4.0
          │47 | Realistic_ViV5.0
          │48 | redshift_din-V10
          │49 | revAnimated_v122
          │50 | rundiffusion_v10
          │51 | rundiffusionFX_v10
          │52 | sdv1_4
          │53 | v1-5-pruned-emaon
          │54 | shoninsBeautiv10
          │55 | theallys-mix-ii-ch
          │56 | timeless-1.0
          │57 | toonyou_beta6
          ╰──────⭔`
        }
    },

    langs: {
        
        en: {
            success: "Image generated successfully!",
            error: "An error occurred: %1"
        }
    },

    onStart: async function ({ message, args, getLang }) {
        try {
            const [text, model] = args[0].split('|').map(part => part.trim());
            const modelNumber = model || 36; 

            const response = await axios.get(`https://api-samir.onrender.com/generate?prompt=${encodeURIComponent(text)}&model=${modelNumber}`);
            const imageUrls = response.data.imageUrls[0];

            message.reply({
                attachment: await global.utils.getStreamFromURL(imageUrls),
            });

            return message.reply(getLang('success'));
        } catch (error) {
            return message.reply(getLang('error', error.message));
        }
    }
};