const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  original_url: { type: String, required: true },
  short_url: { type: Number, required: true, unique: true, default: 1 },
});

module.exports = mongoose.models.Url || mongoose.model("Url", UrlSchema);
