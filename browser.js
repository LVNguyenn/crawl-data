const puppeteer = require("puppeteer-core");
const path = require("path");
//const chromium = require("chrome-aws-lambda");

const startBrowser = async () => {
  let browser;
  try {
    // browser = await puppeteer.launch({
    //   headless: true,
    //   //executablePath: "./chrome/win64-116.0.5793.0/chrome-win64/chrome.exe",
    //   //executablePath: chromePath,
    //   // executablePath:
    //   //   "/vercel/.cache/puppeteer/chrome/linux-123.0.6312.122/chrome-linux64/chrome.exe",
    //   executablePath: process.env.CHROME_EXECUTABLE_PATH,
    //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
    //   ignoreHTTPSErrors: true,
    // });
    // browser = await chromium.puppeteer.launch({
    //   args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    //   defaultViewport: chromium.defaultViewport,
    //   executablePath: await chromium.executablePath,
    //   headless: true,
    //   ignoreHTTPSErrors: true,
    // });
    const executablePath = await chromium.executablePath;
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
  } catch (error) {
    const executablePath = await chromium.executablePath;
    console.log(executablePath);
    console.log("123");
    console.log("Unable to create browser: " + error);
  }

  return browser;
};

module.exports = startBrowser;
