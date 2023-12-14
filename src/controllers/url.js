const { Router } = require("express");
const { createUrl, listOneUrl, listAllUrls } = require("../services/url");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const urls = await listAllUrls();

    return res.status(200).json(urls);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get("/:shortUrl", async (req, res) => {
  try {
    const url = await listOneUrl(req.params.shortUrl);

    return res.redirect(url.originalUrl);
  } catch (err) {
    return res.status(400).json(err);
  }
});

const isValidURL = (url) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  return urlRegex.test(url);
};

router.post("/", async (req, res) => {
  const { originalUrl } = req.body;

  if (!isValidURL(originalUrl)) {
    return res.status(400).json({
      error: "invalid url",
    });
  }

  try {
    const url = await createUrl(req.body);
    const { originalUrl, shortUrl } = url;
    console.log({ originalUrl, shortUrl });

    return res.status(201).json({ originalUrl, shortUrl });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

module.exports = router;
