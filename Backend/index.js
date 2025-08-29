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

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/Home_page.html"));
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

// Start HTTPS server
initializeCountries().then(() => {
  https.createServer(sslOptions, app).listen(443, () => {
    console.log("✅ HTTPS Server running at https://metaadata.com");
  });

  // Optional: Redirect HTTP to HTTPS
  const http = require("http");
  http.createServer((req, res) => {
    res.writeHead(301, { Location: "https://" + req.headers.host + req.url });
    res.end();
  }).listen(80);
});
