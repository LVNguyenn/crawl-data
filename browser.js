const puppeteer = require("puppeteer");
const path = require("path");

const startBrowser = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      //executablePath: "./chrome/win64-116.0.5793.0/chrome-win64/chrome.exe",
      //executablePath: chromePath,
      executablePath:
        "/vercel/.cache/puppeteer/chrome/linux-123.0.6312.122/chrome-linux64/chrome",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
  } catch (error) {
    console.log("1234");
    console.log("Unable to create browser: " + error);
  }

  return browser;
};

module.exports = startBrowser;
