require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const urlController = require("./controllers/url");

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(cors());
app.use(bodyParser.json());
app.use("/api/shorturl", urlController);
app.use(express.static("public"));

app.get("/", (_req, res) => {
  return res.sendFile(process.cwd() + "/views/index.html");
  // return res.sendFile(__dirname.replace("/src", "") + "/views/index.html");
});

// your first API endpoint...
app.get("/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const dns = require('dns');
const hostname = "www.globo.com";
// console.log(hostname);
dns.lookup(hostname, (err, address, family) => {
  if (err) {
    // console.error(`Erro ao resolver o host ${hostname}: ${err.message}`);
  }
  console.log(
    // `Endereço IP de ${hostname}: ${address}, versão do IP: IPv${family}`
  );
});

const listener = app.listen(
  {
    host: "0.0.0.0",
    port: process.env.PORT || 3333,
  },
  () => {
    console.log("Your app is listening on port " + listener.address().port);
  }
);
