const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const https = require("https");
const { initializeCountries } = require("./Routes/initializeCountries.js");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve Frontend folder as static
app.use(express.static(path.join(__dirname, "../Frontend")));

// ✅ Redirect /index.html to /
app.get("/index.html", (req, res) => {
  res.redirect(301, "/");
});

// ✅ Serve root with index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

// Register routes
app.use("/personal", require("./Routes/personal.js"));
app.use("/financial", require("./Routes/financial.js"));
app.use("/employment", require("./Routes/Employment.js"));
app.use("/internet", require("./Routes/Internet.js"));
app.use("/education", require("./Routes/Education.js"));
app.use("/vehicle", require("./Routes/vehicle.js"));
app.use("/contact", require("./Routes/contact.js"));
app.use("/generator", require("./Routes/dataGenerator.js"));

// Load SSL certs
const sslOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/metaadata.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/metaadata.com/fullchain.pem"),
};

// ✅ Only run HTTPS server
initializeCountries().then(() => {
  https.createServer(sslOptions, app).listen(443, () => {
    console.log("✅ HTTPS Server running at https://metaadata.com");
  });
});
