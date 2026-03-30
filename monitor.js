const axios = require("axios");

const url = "https://fnqueue.com/";
const webhook = process.env.DISCORD_WEBHOOK;

async function checkSite() {
  try {
    const res = await axios.get(url);
    const text = res.data.toLowerCase();

    if (text.includes("online")) {
      console.log("🔥 ONLINE!");

      await axios.post(webhook, {
        content: "@WAKE ME UP FN 🚨 FNQUEUE IS ONLINE!"
      });

      process.exit(1);
    }

    console.log("Still offline...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

checkSite();
