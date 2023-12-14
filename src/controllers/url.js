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
  const { shortUrl } = req.params;
  try {
    const url = await listOneUrl(shortUrl);

    return res.redirect(url.original_url);
  } catch (err) {
    return res.status(400).json(err);
  }
});

const isValidURL = (url) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  return urlRegex.test(url);
};

router.post("/", async (req, res) => {
  const { original_url } = req.body;

  if (!isValidURL(original_url)) {
    return res.status(400).json({
      error: "invalid url",
    });
  }

  try {
    const url = await createUrl(req.body);
    const { original_url, short_url } = url;

    return res.status(201).json({ original_url, short_url });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

module.exports = router;
