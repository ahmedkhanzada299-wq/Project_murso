const express = require("express");
const cors = require("cors");
const path = require("path");
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

// Start Server
initializeCountries().then(() => {
  app.listen(5000, () => {
    console.log("✅ Server is running on http://localhost:5000");
  });
});
