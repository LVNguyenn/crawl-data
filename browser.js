const puppeteer = require("puppeteer-core");
const path = require("path");
const filePath = path.join(
  __dirname,
  "/vercel/path0/chrome/linux-116.0.5793.0/chrome-linux64/chrome"
);

const startBrowser = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      //executablePath: "./chrome/win64-116.0.5793.0/chrome-win64/chrome.exe",
      //executablePath: filePath,
      executablePath:
        "/vercel/path0/chrome/linux-116.0.5793.0/chrome-linux64/chrome/win64-116.0.5793.0/chrome-win64/chrome.exe",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
  } catch (error) {
    console.log("1234");
    console.log("File path", filePath);
    console.log("Unable to create browser: " + error);
  }

  return browser;
};

module.exports = startBrowser;
