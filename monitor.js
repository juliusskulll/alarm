const axios = require("axios");

const URL = "https://fnqueue.com/";
const WEBHOOK = process.env.DISCORD_WEBHOOK;

async function run() {
  console.log("Starting check...");

  // ✅ Check webhook exists
  if (!WEBHOOK) {
    console.error("❌ DISCORD_WEBHOOK is missing!");
    process.exit(1);
  } else {
    console.log("✅ Webhook loaded");
  }

  try {
    const res = await axios.get(URL);
    const text = res.data.toLowerCase();

    console.log("✅ Site fetched");

    // 🔍 DEBUG: check condition
    const isOnline = text.includes("online");
    console.log("Contains 'online':", isOnline);

    if (isOnline) {
      console.log("🔥 FNQUEUE IS ONLINE!");

      await axios.post(WEBHOOK, {
        content: "@WAKE ME UP FN 🚨 FNQUEUE IS ONLINE!"
      });

      console.log("✅ Message sent to Discord");

      // fail so GitHub notifies you too
      process.exit(1);
    } else {
      console.log("⏳ Still offline...");
    }

  } catch (err) {
    console.error("❌ ERROR:");
    console.error(err.response?.data || err.message);
    process.exit(1);
  }
}

run();
