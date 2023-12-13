const { Router } = require("express");
const { createUrl, listOneUrl, listAllUrls } = require("../services/url");

const router = Router();

router.get("/", async (req, res) => {
  try {
    // return res.status(200).send({message: "rota listAllUrls"});
    const urls = await listAllUrls();

    return res.status(200).send(urls);
  } catch (error) {
    console.log("erro na rota get /api");
    return res.status(400).send(error);
  }
});

router.get("/:shortUrl", async (req, res) => {
  try {
    const url = await listOneUrl(req.params.shortUrl);

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.log("erro na rota get /api/shorturl/:id");
    return res.status(400).send(error);
  }
});

// router.get("/:shortUrl", async (req, res) => {
//   try {
//     const url = await listOneUrl(req.params.shortUrl);

//     return res.status(200).send(url);
//   } catch (error) {
//     console.log("erro na rota get /api/shorturl/:id");
//     return res.status(400).send(error);
//   }
// });

const isValidURL = (url) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  return urlRegex.test(url);
};

router.post("/", async (req, res) => {
  // return res.status(201).send({ originalUrl, shortUrl });
  const { originalUrl } = req.body;

  if (!isValidURL(originalUrl)) {
    return res.status(400).send({
      error: "invalid url",
    });
  }

  try {
    const url = await createUrl(req.body);
    const { originalUrl, shortUrl } = url;
    console.log({ originalUrl, shortUrl })

    return res.status(201).send({ originalUrl, shortUrl });
  } catch (error) {
    console.log("erro na rota post /api");
    console.log(error)
    return res.status(400).send(error);
  }
});

// router.delete("/:userId", async (req, res) => {
//   const { userId } = req.params;
//   console.log(userId);
//   try {
//     await deleteUser(userId);

//     return res.status(204).send("deleted");
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// });

// router.put("/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const userUpdated = req.body;

//   try {
//     await updateUser(userId, userUpdated);

//     return res.status(204).send();
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// });

module.exports = router;
