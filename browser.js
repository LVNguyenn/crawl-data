const puppeteer = require("puppeteer-core");
//const chromium = require("chrome-aws-lambda");
//const playwright = require("playwright-core");

const startBrowser = async () => {
  let browser;
  try {
    browser = puppeteer.launch({
      headless: true,
      //   executablePath:
      //     "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      //args: ["--disable-setuid-sandbox"],
      executablePath: "./chrome/win64-116.0.5793.0/chrome-win64/chrome.exe",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
    // browser = await chromium.puppeteer.launch({
    //   ignoreDefaultArgs: ["--disable-extensions"],
    //   executablePath: await chromium.executablePath,
    // });

    //browser = puppeteer.launch();
    // browser = await chromium.puppeteer.launch({
    //   args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    //   defaultViewport: chromium.defaultViewport,
    //   executablePath: await chromium.executablePath,
    //   headless: true,
    //   ignoreHTTPSErrors: true,
    // });
    // browser = await playwright.chromium.puppeteer.launch({
    //   args: chromium.args,
    //   executablePath:
    //     process.env.NODE_ENV !== "development"
    //       ? await chromium.executablePath
    //       : "/usr/bin/chromium",
    //   headless:
    //     process.env.NODE_ENV !== "development" ? chromium.headless : true,
    // });

    // browser = await puppeteer.launch({
    //   args: chromium.args,
    //   defaultViewport: chromium.defaultViewport,
    //   executablePath: await chromium.executablePath,
    //   headless: false,
    // });
  } catch (error) {
    console.log("1234");
    console.log("Unable to create browser: " + error);
  }

  return browser;
};

module.exports = startBrowser;
