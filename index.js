const express = require("express");
const app = express();
app.use(express.json());
const DB = require("./Database/db");
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.redirect("https://app.swaggerhub.com/apis-docs/monster-anshu/Zomato_Api/1.0.0")
});
app.use("/cat", require("./routes/catogories"));
app.use("/items", require("./routes/items"));
app.listen(port, () => {
  DB.connectDB();
  console.log("Api running on port : " + port);
});
