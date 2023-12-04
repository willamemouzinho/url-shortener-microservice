require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const urlController = require("./controllers/url");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api/shorturl", urlController);
app.use(express.static(`${process.cwd()}/public`));

app.get("/", (_req, res) => {
  return res.sendFile(process.cwd() + "/views/index.html");
  // return res.sendFile(__dirname.replace("/src", "") + "/views/index.html");
});

// your first API endpoint...
app.get("/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// app.get("/api/:timestamp", function (req, res) {
//   const timestampFromRequest = req.params.timestamp;

//   const date = Number(timestampFromRequest)
//     ? new Date(Number(timestampFromRequest))
//     : new Date(timestampFromRequest);

//   if (!date.toJSON()) {
//     return res.json({ error: "Invalid Date" });
//   }

//   const result = {
//     unix: date.getTime(),
//     utc: date.toUTCString(),
//   };
//   return res.json(result);
// });

// app.get("/api", function (req, res) {
//   const currentDate = new Date();

//   return res.json({
//     unix: currentDate.getTime(),
//     utc: currentDate.toUTCString(),
//   });
// });

// app.post("/api");

// listen for requests :)
const listener = app.listen(
  {
    host: "0.0.0.0",
    port: process.env.PORT || 3333,
  },
  () => {
    console.log("Your app is listening on port " + listener.address().port);
  }
);
