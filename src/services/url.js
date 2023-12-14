const databaseConnection = require("../utils/database");
const Url = require("../models/url");

const listAllUrls = async () => {
  await databaseConnection();

  const urls = await Url.find({}, "original_url short_url -_id");

  return urls;
};

const listOneUrl = async (shortUrl) => {
  await databaseConnection();

  const url = await Url.findOne(
    { short_url: shortUrl },
    "original_url short_url -_id"
  );

  return url;
};

const createUrl = async (url) => {
  await databaseConnection();

  const count = await Url.countDocuments();

  const newUrl = Url.create({
    ...url,
    short_url: count,
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
