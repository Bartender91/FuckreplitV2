const axios = require("axios");

module.exports = {
  config: {
    name: "currency",
    version: "1.2",
    author: "Shikaki",
    category: "Currency",
    shortDescription: {
      en: "Convert between currencies."
    },
    longDescription: {
      en: "Convert between currencies using the latest exchange rates.\n\n"
      + "Supported Currencies:\n"
      + "🇦🇺 AUD - Australian Dollar\n"
      + "🇧🇬 BGN - Bulgarian Lev\n"
      + "🇧🇷 BRL - Brazilian Real\n"
      + "🇨🇦 CAD - Canadian Dollar\n"
      + "🇨🇭 CHF - Swiss Franc\n"
      + "🇨🇳 CNY - Chinese Yuan\n"
      + "🇨🇿 CZK - Czech Koruna\n"
      + "🇩🇰 DKK - Danish Krone\n"
      + "🇪🇺 EUR - Euro\n"
      + "🇬🇧 GBP - British Pound Sterling\n"
      + "🇭🇰 HKD - Hong Kong Dollar\n"
      + "🇭🇷 HRK - Croatian Kuna\n"
      + "🇭🇺 HUF - Hungarian Forint\n"
      + "🇮🇩 IDR - Indonesian Rupiah\n"
      + "🇮🇱 ILS - Israeli New Shekel\n"
      + "🇮🇳 INR - Indian Rupee\n"
      + "🇮🇸 ISK - Icelandic Króna\n"
      + "🇯🇵 JPY - Japanese Yen\n"
      + "🇰🇷 KRW - South Korean Won\n"
      + "🇲🇽 MXN - Mexican Peso\n"
      + "🇲🇾 MYR - Malaysian Ringgit\n"
      + "🇳🇴 NOK - Norwegian Krone\n"
      + "🇳🇿 NZD - New Zealand Dollar\n"
      + "🇵🇭 PHP - Philippine Peso\n"
      + "🇵🇱 PLN - Polish Złoty\n"
      + "🇷🇴 RON - Romanian Leu\n"
      + "🇷🇺 RUB - Russian Ruble\n"
      + "🇸🇪 SEK - Swedish Krona\n"
      + "🇸🇬 SGD - Singapore Dollar\n"
      + "🇹🇭 THB - Thai Baht\n"
      + "🇹🇷 TRY - Turkish Lira\n"
      + "🇺🇸 USD - United States Dollar\n"
      + "🇿🇦 ZAR - South African Rand\n"
    },
guide: {
  en: ".currency 3500000 USD ZAR:\n\n" +
    "3500000 USD is approximately 66380867.71 ZAR.\n"
}

  },

  onStart: async function ({ api, event, args }) {
    try {
      // Ensure the API key is correct
      const apiKey = "fca_live_UcV2B4x3A7bDWP1sHn8akDa41kITcfsIEohEpkZP"; // Replace with your actual API key
      const fromCurrency = args[1];
      const toCurrency = args[2];

      if (!fromCurrency || !toCurrency) {
        api.sendMessage("Please provide valid fromCurrency and toCurrency.", event.threadID);
        return;
      }

      // Fetch the exchange rates data
      const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`;
      const response = await axios.get(apiUrl);
      const data = response.data.data;

      // Check if the currency codes are valid
      if (fromCurrency in data && toCurrency in data) {
        const amount = parseFloat(args[0]);
        if (isNaN(amount)) {
          api.sendMessage("Please provide a valid amount.", event.threadID);
        } else {
          const convertedAmount = (amount * data[toCurrency] / data[fromCurrency]).toFixed(2);
          api.sendMessage(`${amount} ${fromCurrency} is approximately ${convertedAmount} ${toCurrency}.`, event.threadID);
        }
      } else {
        api.sendMessage("Invalid currency codes provided.", event.threadID);
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      api.sendMessage("An error occurred while fetching the exchange rates.", event.threadID);
    }
  },
};