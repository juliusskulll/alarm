const axios = require("axios");

const url = "https://fnqueue.com/";

async function checkSite() {
  try {
    const res = await axios.get(url);
    const text = res.data.toLowerCase();

    console.log("Checking site...");

    if (text.includes("online")) {
      console.log("🔥 FNQUEUE IS ONLINE!");

      // Force GitHub Action to fail (so you get notified)
      process.exit(1);
    } else {
      console.log("Still offline...");
    }

  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

checkSite();
