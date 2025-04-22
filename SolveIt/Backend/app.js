const express = require('express');
const app = express()

require("dotenv").config();
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
const cors = require("cors");


app.use(cors());
require('./models/model');
require('./models/post');
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));

// MongoDB Connection - UPDATED SECTION
mongoose
  .connect(mongoUrl) // Removed deprecated options
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  });


// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port${port}`);
});