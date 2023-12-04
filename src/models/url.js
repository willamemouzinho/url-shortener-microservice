const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: Number, required: true, unique: true, default: 1 },
});

module.exports = mongoose.models.Url || mongoose.model("Url", UrlSchema);
