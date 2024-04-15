const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const Article = require("./models/articleModel");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET"],
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/scrape", async (req, res) => {
  const scrapeApiUrl = "https://crawl-4tjn.onrender.com/scrape";

  try {
    const response = await axios.get(scrapeApiUrl);

    if (response.status === 200) {
      res
        .status(200)
        .json({ message: "Successfully triggered external scraper" });
    } else {
      res.status(500).json({ error: "External API returned an error" });
    }
  } catch (error) {
    console.error("Error calling external API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/articles", async (req, res) => {
  try {
    const page = Math.abs(parseInt(req.query.page)) || 1;
    const perPage = Math.abs(parseInt(req.query.perPage)) || 5;
    const startIndex = (page - 1) * perPage;

    const articlesData = await Article.find()
      .sort({ "meta.publish": -1 })
      .skip(startIndex)
      .limit(perPage)
      .exec();

    const transformedArticles = articlesData.map((article) => ({
      id: article.id,
      thumbnail: article.thumbnail,
      title: article.title,
      publish: article.meta.publish,
      summary: article.summary,
    }));

    const totalArticlesCount = await Article.countDocuments();
    const hasNextPage = startIndex + perPage < totalArticlesCount;

    res.json({
      articles: transformedArticles,
      page: page,
      perPage: perPage,
      total: totalArticlesCount,
      hasNextPage: hasNextPage,
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ status: "failed", msg: "Internal server error" });
  }
});

app.get("/articles/:id", async (req, res) => {
  const articleId = req.params.id;

  try {
    const article = await Article.findOne({ id: articleId });

    if (!article) {
      return res
        .status(404)
        .json({ status: "failed", msg: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ status: "failed", msg: "Internal server error" });
  }
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
