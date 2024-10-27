require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");
const app = express();
const cookieParser = require("cookie-parser");

mongoose
  .connect(process.env.DB_URL, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api", routes);
const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
