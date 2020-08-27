const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use("/api/messages", require("./routes/api/guest_book"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App started on ${PORT}`));
  } catch (error) {
    console.log("Server Error", error.message);
    process.exit(1);
  }
}

start();
