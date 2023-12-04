const databaseConnection = require("../utils/database");
const Url = require("../models/url");

const listAllUrls = async () => {
  await databaseConnection();

  const urls = await Url.find({}, "originalUrl shortUrl -_id");

  return urls;
};

const listOneUrl = async (shortUrl) => {
  await databaseConnection();

  const url = await Url.findOne(
    { shortUrl: shortUrl },
    "originalUrl shortUrl -_id"
  );

  return url;
};

const createUrl = async (url) => {
  await databaseConnection();

  const count = await Url.countDocuments();

  const newUrl = Url.create({
    ...url,
    shortUrl: count,
  });

  return newUrl;
};

// const deleteUrl = async (userId) => {
//   await databaseConnection();

//   return await User.findByIdAndDelete(userId);
// };

// const updateUrl = async (userId, userUpdated) => {
//   await databaseConnection();

//   return await User.findByIdAndUpdate(userId, userUpdated);
// };

module.exports = {
  listAllUrls,
  listOneUrl,
  createUrl,
};
